"use client"

import { useState, useEffect, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { MapPin, Loader2 } from 'lucide-react'
import { GooglePlacesService } from '@/lib/google-places'

interface AddressSuggestion {
  placeId: string
  description: string
  mainText: string
  secondaryText: string
}

interface AddressAutocompleteProps {
  onAddressSelect: (address: {
    formatted_address: string
    postal_code: string
    city: string
  }) => void
  placeholder?: string
  label?: string
  className?: string
}

export function AddressAutocomplete({
  onAddressSelect,
  placeholder = "Entrez votre adresse...",
  label = "Adresse",
  className
}: AddressAutocompleteProps) {
  const [input, setInput] = useState('')
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  
  const inputRef = useRef<HTMLInputElement>(null)
  const googlePlaces = GooglePlacesService.getInstance()

  useEffect(() => {
    const searchPlaces = async () => {
      if (input.length < 3) {
        setSuggestions([])
        setShowSuggestions(false)
        return
      }

      setIsLoading(true)
      try {
        const predictions = await googlePlaces.getPlacePredictions(input)
        const formattedSuggestions: AddressSuggestion[] = predictions.map(prediction => ({
          placeId: prediction.place_id,
          description: prediction.description,
          mainText: prediction.structured_formatting?.main_text || '',
          secondaryText: prediction.structured_formatting?.secondary_text || ''
        }))
        
        setSuggestions(formattedSuggestions)
        setShowSuggestions(true)
        setSelectedIndex(-1)
      } catch (error) {
        console.error('Error fetching place predictions:', error)
        setSuggestions([])
        setShowSuggestions(false)
      } finally {
        setIsLoading(false)
      }
    }

    const debounceTimer = setTimeout(searchPlaces, 300)
    return () => clearTimeout(debounceTimer)
  }, [input])

  const handleSelectSuggestion = async (suggestion: AddressSuggestion) => {
    setInput(suggestion.description)
    setShowSuggestions(false)
    setSuggestions([])
    setSelectedIndex(-1)

    try {
      const placeDetails = await googlePlaces.getPlaceDetails(suggestion.placeId)
      const postalCode = googlePlaces.extractPostalCode(placeDetails)
      const city = googlePlaces.extractCity(placeDetails)

      onAddressSelect({
        formatted_address: placeDetails.formatted_address,
        postal_code: postalCode || '',
        city: city || ''
      })
    } catch (error) {
      console.error('Error fetching place details:', error)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        )
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSelectSuggestion(suggestions[selectedIndex])
        }
        break
      case 'Escape':
        setShowSuggestions(false)
        setSelectedIndex(-1)
        break
    }
  }

  return (
    <div className="relative">
      <Label htmlFor="address" className="text-white">
        {label} *
      </Label>
      <div className="relative">
        <Input
          ref={inputRef}
          id="address"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            // Delay hiding suggestions to allow clicks
            setTimeout(() => setShowSuggestions(false), 150)
          }}
          onFocus={() => input.length >= 3 && suggestions.length > 0 && setShowSuggestions(true)}
          className={`bg-white/5 border-white/20 text-white mt-2 pr-10 ${className}`}
          placeholder={placeholder}
          autoComplete="address-line1"
        />
        
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 mt-1">
          {isLoading ? (
            <Loader2 className="w-4 h-4 text-white/50 animate-spin" />
          ) : (
            <MapPin className="w-4 h-4 text-white/50" />
          )}
        </div>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <Card className="absolute top-full left-0 right-0 z-50 mt-1 bg-white/95 border-white/20 backdrop-blur-sm max-h-60 overflow-auto">
          <CardContent className="p-0">
            {suggestions.map((suggestion, index) => (
              <div
                key={suggestion.placeId}
                className={`px-4 py-3 cursor-pointer transition-colors ${
                  index === selectedIndex 
                    ? 'bg-[#D4AF37]/20' 
                    : 'hover:bg-white/10'
                }`}
                onClick={() => handleSelectSuggestion(suggestion)}
              >
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-gray-900 font-medium truncate">
                      {suggestion.mainText}
                    </div>
                    <div className="text-gray-600 text-sm truncate">
                      {suggestion.secondaryText}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}