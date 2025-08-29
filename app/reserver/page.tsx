"use client"

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { toast } from '@/hooks/use-toast'
import { CalendarIcon, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import {
  BookingFormData,
  validateBookingRules,
  calculateTotalPrice,
  getZoneFromPostalCode,
  ZONE_SCHEDULE,
  SERVICES,
  isExterior,
  Gearbox,
  PlaceType
} from '@/lib/business-logic'
import { ServiceCard } from '@/components/booking/ServiceCard'

const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '12:00', 
  '13:00', '14:00', '15:00', '16:00', '17:00'
]

export default function ReserverPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [date, setDate] = useState<Date>()
  
  const [formData, setFormData] = useState<BookingFormData>({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    address: '',
    postalCode: '',
    city: '',
    vehicleType: '',
    gearbox: 'BVA',
    placeType: 'PRIVE',
    serviceType: '',
    date: '',
    timeSlot: '',
    notes: ''
  })

  const [validation, setValidation] = useState({
    isValid: true,
    errors: [] as string[],
    suggestions: [] as string[]
  })

  // Update validation when form data changes
  const updateValidation = useCallback(() => {
    const result = validateBookingRules(formData)
    setValidation(result)
  }, [formData])

  const updateFormData = (field: keyof BookingFormData, value: string) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value }
      return updated
    })
  }

  // Get available services based on location type
  const getAvailableServices = () => {
    if (formData.placeType === 'PUBLIC') {
      return SERVICES.filter(service => service.id === 'interieur')
    }
    return SERVICES
  }

  // Get available time slots based on service and zone
  const getAvailableTimeSlots = () => {
    if (!formData.serviceType || !date) return TIME_SLOTS

    if (isExterior(formData.serviceType)) {
      const zone = getZoneFromPostalCode(formData.postalCode)
      if (zone) {
        const allowedDays = ZONE_SCHEDULE[zone]
        const dayOfWeek = date.getDay()
        
        if (!allowedDays.includes(dayOfWeek)) {
          return []
        }
      }
    }
    
    return TIME_SLOTS
  }

  // Check if a date should be disabled
  const isDateDisabled = (date: Date) => {
    const today = new Date()
    if (date < today) return true

    // If exterior service is selected, check zone restrictions
    if (isExterior(formData.serviceType) && formData.postalCode) {
      const zone = getZoneFromPostalCode(formData.postalCode)
      if (zone) {
        const allowedDays = ZONE_SCHEDULE[zone]
        const dayOfWeek = date.getDay()
        return !allowedDays.includes(dayOfWeek)
      }
    }

    return false
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la réservation')
      }

      const { sessionUrl } = await response.json()
      
      // Redirect to Stripe checkout
      window.location.href = sessionUrl
      
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la réservation. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const nextStep = () => {
    updateValidation()
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const totalPrice = calculateTotalPrice(formData)

  return (
    <div className="min-h-screen bg-[#0F0F0F] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors",
                  step <= currentStep 
                    ? "bg-[#D4AF37] text-black" 
                    : "bg-white/10 text-white/60"
                )}>
                  {step}
                </div>
                {step < 4 && (
                  <div className={cn(
                    "w-20 h-0.5 mx-2",
                    step < currentStep ? "bg-[#D4AF37]" : "bg-white/10"
                  )}></div>
                )}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-4 mt-4 text-center">
            <div className="text-sm text-white/70">Informations</div>
            <div className="text-sm text-white/70">Service</div>
            <div className="text-sm text-white/70">Planification</div>
            <div className="text-sm text-white/70">Confirmation</div>
          </div>
        </div>

        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white text-2xl">
              {currentStep === 1 && "Vos Informations"}
              {currentStep === 2 && "Choix du Service"}
              {currentStep === 3 && "Date et Heure"}
              {currentStep === 4 && "Récapitulatif"}
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            {/* Step 1: Customer Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-white">Nom complet *</Label>
                    <Input
                      id="name"
                      value={formData.customerName}
                      onChange={(e) => updateFormData('customerName', e.target.value)}
                      className="bg-white/5 border-white/20 text-white mt-2"
                      placeholder="Votre nom et prénom"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-white">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.customerEmail}
                      onChange={(e) => updateFormData('customerEmail', e.target.value)}
                      className="bg-white/5 border-white/20 text-white mt-2"
                      placeholder="votre@email.fr"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone" className="text-white">Téléphone *</Label>
                  <Input
                    id="phone"
                    value={formData.customerPhone}
                    onChange={(e) => updateFormData('customerPhone', e.target.value)}
                    className="bg-white/5 border-white/20 text-white mt-2"
                    placeholder="06 12 34 56 78"
                  />
                </div>

                <div>
                  <Label htmlFor="address" className="text-white">Adresse d'intervention *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => updateFormData('address', e.target.value)}
                    className="bg-white/5 border-white/20 text-white mt-2"
                    placeholder="123 rue de la Paix"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="postalCode" className="text-white">Code postal *</Label>
                    <Input
                      id="postalCode"
                      value={formData.postalCode}
                      onChange={(e) => updateFormData('postalCode', e.target.value)}
                      className="bg-white/5 border-white/20 text-white mt-2"
                      placeholder="92100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city" className="text-white">Ville *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => updateFormData('city', e.target.value)}
                      className="bg-white/5 border-white/20 text-white mt-2"
                      placeholder="Boulogne-Billancourt"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="vehicle" className="text-white">Type de véhicule</Label>
                  <Select value={formData.vehicleType} onValueChange={(value) => updateFormData('vehicleType', value)}>
                    <SelectTrigger className="bg-white/5 border-white/20 text-white mt-2">
                      <SelectValue placeholder="Sélectionnez votre véhicule" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="berline">Berline</SelectItem>
                      <SelectItem value="suv">SUV</SelectItem>
                      <SelectItem value="break">Break</SelectItem>
                      <SelectItem value="coupe">Coupé</SelectItem>
                      <SelectItem value="cabriolet">Cabriolet</SelectItem>
                      <SelectItem value="monospace">Monospace</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Step 2: Service Selection */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-white text-lg mb-4 block">Type de boîte *</Label>
                  <RadioGroup 
                    value={formData.gearbox} 
                    onValueChange={(value) => updateFormData('gearbox', value as Gearbox)}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div className="flex items-center space-x-2 bg-white/5 p-4 rounded-lg border border-white/10">
                      <RadioGroupItem value="BVA" id="bva" className="text-[#D4AF37]" />
                      <Label htmlFor="bva" className="text-white cursor-pointer">
                        Automatique (BVA)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 bg-white/5 p-4 rounded-lg border border-white/10">
                      <RadioGroupItem value="BVM" id="bvm" className="text-[#D4AF37]" />
                      <Label htmlFor="bvm" className="text-white cursor-pointer">
                        Manuelle (BVM)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label className="text-white text-lg mb-4 block">Lieu d'intervention *</Label>
                  <RadioGroup 
                    value={formData.placeType} 
                    onValueChange={(value) => updateFormData('placeType', value as PlaceType)}
                    className="space-y-3"
                  >
                    <div className="flex items-start space-x-3 bg-white/5 p-4 rounded-lg border border-white/10">
                      <RadioGroupItem value="PRIVE" id="prive" className="text-[#D4AF37] mt-1" />
                      <div>
                        <Label htmlFor="prive" className="text-white cursor-pointer font-medium">
                          Emplacement privé autorisé
                        </Label>
                        <p className="text-white/70 text-sm mt-1">
                          Allée, cour, box, parking d'entreprise - Tous services disponibles
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 bg-white/5 p-4 rounded-lg border border-white/10">
                      <RadioGroupItem value="PUBLIC" id="public" className="text-[#D4AF37] mt-1" />
                      <div>
                        <Label htmlFor="public" className="text-white cursor-pointer font-medium">
                          Voie/parking public
                        </Label>
                        <p className="text-white/70 text-sm mt-1">
                          Intérieur uniquement (réglementation municipale)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 bg-white/5 p-4 rounded-lg border border-white/10">
                      <RadioGroupItem value="HUB" id="hub" className="text-[#D4AF37] mt-1" />
                      <div>
                        <Label htmlFor="hub" className="text-white cursor-pointer font-medium">
                          Micro-hub AS
                        </Label>
                        <p className="text-white/70 text-sm mt-1">
                          Notre atelier - Tous services disponibles, pas de convoyage
                        </p>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label className="text-white text-lg mb-4 block">Service souhaité *</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {getAvailableServices().map((service) => (
                      <ServiceCard
                        key={service.id}
                        id={service.id}
                        title={service.title}
                        price={service.price}
                        durationMin={service.durationMin}
                        type={service.type}
                        selected={formData.serviceType === service.id}
                        onSelect={() => updateFormData('serviceType', service.id)}
                      />
                    ))}
                  </div>
                </div>

                {formData.gearbox === 'BVA' && formData.placeType !== 'HUB' && (
                  <div>
                    <Label className="text-white text-lg mb-4 block">
                      Service de convoyage (optionnel)
                      <span className="text-sm text-white/70 block font-normal">
                        Disponible uniquement pour boîtes automatiques
                      </span>
                    </Label>
                    <RadioGroup 
                      value={formData.convoyageDistance || 'none'} 
                      onValueChange={(value) => updateFormData('convoyageDistance', value === 'none' ? undefined : value as any)}
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-2 bg-white/5 p-4 rounded-lg border border-white/10">
                        <RadioGroupItem value="none" id="no-convoyage" className="text-[#D4AF37]" />
                        <Label htmlFor="no-convoyage" className="text-white cursor-pointer">
                          Pas de convoyage
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 bg-white/5 p-4 rounded-lg border border-white/10">
                        <RadioGroupItem value="0_10" id="conv-0-10" className="text-[#D4AF37]" />
                        <Label htmlFor="conv-0-10" className="text-white cursor-pointer flex-1">
                          ≤ 10 km - 29€
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 bg-white/5 p-4 rounded-lg border border-white/10">
                        <RadioGroupItem value="11_20" id="conv-11-20" className="text-[#D4AF37]" />
                        <Label htmlFor="conv-11-20" className="text-white cursor-pointer flex-1">
                          11-20 km - 39€
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}

                {/* Validation Messages */}
                {!validation.isValid && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                    <div className="flex items-center text-red-400 mb-2">
                      <AlertTriangle size={18} className="mr-2" />
                      <span className="font-medium">Attention</span>
                    </div>
                    {validation.errors.map((error, index) => (
                      <p key={index} className="text-red-300 text-sm mb-1">• {error}</p>
                    ))}
                    {validation.suggestions.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-red-500/20">
                        <p className="text-red-300 font-medium text-sm mb-1">Suggestions :</p>
                        {validation.suggestions.map((suggestion, index) => (
                          <p key={index} className="text-red-300 text-sm">• {suggestion}</p>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Date and Time Selection */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-white text-lg mb-4 block">Date d'intervention *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal bg-white/5 border-white/20 text-white hover:bg-white/10",
                          !date && "text-white/50"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP", { locale: fr }) : "Sélectionnez une date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(selectedDate) => {
                          setDate(selectedDate)
                          updateFormData('date', selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '')
                        }}
                        disabled={isDateDisabled}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label className="text-white text-lg mb-4 block">Créneau horaire *</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {getAvailableTimeSlots().map((timeSlot) => (
                      <Button
                        key={timeSlot}
                        variant={formData.timeSlot === timeSlot ? "default" : "outline"}
                        className={cn(
                          "bg-white/5 border-white/20 text-white hover:bg-white/10",
                          formData.timeSlot === timeSlot && "bg-[#D4AF37] text-black hover:bg-[#B8941F]"
                        )}
                        onClick={() => updateFormData('timeSlot', timeSlot)}
                      >
                        {timeSlot}
                      </Button>
                    ))}
                  </div>
                  {getAvailableTimeSlots().length === 0 && (
                    <p className="text-orange-400 text-sm mt-2">
                      Aucun créneau disponible pour cette date avec le service sélectionné.
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="notes" className="text-white">Notes particulières</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => updateFormData('notes', e.target.value)}
                    className="bg-white/5 border-white/20 text-white mt-2"
                    placeholder="Informations complémentaires, accès, digicode..."
                    rows={4}
                  />
                </div>
              </div>
            )}

            {/* Step 4: Summary */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="bg-white/5 p-6 rounded-lg">
                  <h3 className="text-white text-lg font-medium mb-4">Récapitulatif de votre réservation</h3>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/70">Client :</span>
                      <span className="text-white">{formData.customerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Email :</span>
                      <span className="text-white">{formData.customerEmail}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Téléphone :</span>
                      <span className="text-white">{formData.customerPhone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Adresse :</span>
                      <span className="text-white">{formData.address}, {formData.postalCode} {formData.city}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Service :</span>
                      <span className="text-white">{SERVICES.find(s => s.id === formData.serviceType)?.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Date et heure :</span>
                      <span className="text-white">
                        {date && format(date, "PPP", { locale: fr })} à {formData.timeSlot}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 p-6 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-white text-lg font-medium">Total :</span>
                    <span className="text-[#D4AF37] text-2xl font-bold">{totalPrice}€</span>
                  </div>
                  <div className="text-white/70 text-sm space-y-1">
                    <p>• Dépôt de garantie : 20€ (à régler maintenant)</p>
                    <p>• Solde : {totalPrice - 20}€ (à régler sur place)</p>
                    <p>• Paiement sécurisé par Stripe</p>
                  </div>
                </div>

                <div className="text-white/60 text-sm space-y-2">
                  <p>En validant cette réservation, vous acceptez nos conditions générales de vente.</p>
                  <p>Vous recevrez un email de confirmation avec tous les détails de votre rendez-vous.</p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t border-white/10 mt-8">
              {currentStep > 1 && (
                <Button 
                  variant="outline" 
                  onClick={prevStep}
                  className="border-white/20 text-white hover:bg-white/5"
                >
                  Précédent
                </Button>
              )}
              
              <div className="ml-auto">
                {currentStep < 4 ? (
                  <Button 
                    onClick={nextStep}
                    className="bg-[#D4AF37] hover:bg-[#B8941F] text-black"
                    disabled={!validation.isValid && currentStep === 2}
                  >
                    Suivant
                  </Button>
                ) : (
                  <Button 
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="bg-[#D4AF37] hover:bg-[#B8941F] text-black"
                  >
                    {isLoading ? 'Traitement...' : `Payer le dépôt (20€)`}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}