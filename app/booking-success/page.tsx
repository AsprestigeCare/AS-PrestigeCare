"use client"

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Calendar, MapPin, Euro, Phone, Mail, Download } from 'lucide-react'
import Link from 'next/link'

export default function BookingSuccessPage() {
  const searchParams = useSearchParams()
  const bookingId = searchParams.get('booking_id')
  const [bookingDetails, setBookingDetails] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, you would fetch the booking details from your API
    // For now, we'll simulate this with mock data
    const fetchBookingDetails = async () => {
      if (bookingId) {
        // Simulate API call
        setTimeout(() => {
          setBookingDetails({
            id: bookingId,
            customerName: 'Client AS Prestige Care',
            service: 'Intérieur Premium',
            date: '2024-11-25',
            time: '14:00',
            address: '123 Avenue de la République, 92100 Boulogne-Billancourt',
            totalAmount: 100,
            depositPaid: 20,
            remainingAmount: 80,
            status: 'CONFIRMED'
          })
          setIsLoading(false)
        }, 1000)
      } else {
        setIsLoading(false)
      }
    }

    fetchBookingDetails()
  }, [bookingId])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
        <div className="text-white">Chargement de votre réservation...</div>
      </div>
    )
  }

  if (!bookingDetails) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
        <Card className="bg-white/5 border-white/10 p-8 text-center max-w-md">
          <CardContent>
            <h1 className="text-white text-2xl font-bold mb-4">Réservation introuvable</h1>
            <p className="text-white/70 mb-6">
              Nous n'avons pas pu trouver les détails de votre réservation.
            </p>
            <Button asChild className="bg-[#D4AF37] hover:bg-[#B8941F] text-black">
              <Link href="/">Retour à l'accueil</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-white" />
          </div>
          
          <h1 className="font-playfair text-4xl font-light text-white mb-4">
            Réservation Confirmée !
          </h1>
          
          <p className="text-xl text-white/70 mb-6">
            Merci pour votre confiance. Votre réservation a été enregistrée avec succès.
          </p>
          
          <Badge className="bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20 text-lg px-4 py-2">
            Référence: #{bookingDetails.id}
          </Badge>
        </div>

        {/* Booking Details */}
        <Card className="bg-white/5 border-white/10 mb-8">
          <CardContent className="p-8">
            <h2 className="text-white text-2xl font-semibold mb-6">Détails de votre réservation</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Calendar className="w-6 h-6 text-[#D4AF37] mt-1" />
                  <div>
                    <h3 className="text-white font-medium">Date et heure</h3>
                    <p className="text-white/70">
                      {new Date(bookingDetails.date).toLocaleDateString('fr-FR', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })} à {bookingDetails.time}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-[#D4AF37] mt-1" />
                  <div>
                    <h3 className="text-white font-medium">Adresse d'intervention</h3>
                    <p className="text-white/70">{bookingDetails.address}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-white font-medium mb-4">Service sélectionné</h3>
                  <Badge className="bg-[#D4AF37] text-black font-medium text-lg px-4 py-2">
                    {bookingDetails.service}
                  </Badge>
                </div>

                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-white font-medium mb-4">Paiement</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/70">Montant total :</span>
                      <span className="text-white font-medium">{bookingDetails.totalAmount}€</span>
                    </div>
                    <div className="flex justify-between text-green-400">
                      <span>Dépôt payé :</span>
                      <span>-{bookingDetails.depositPaid}€</span>
                    </div>
                    <div className="border-t border-white/10 pt-2 flex justify-between">
                      <span className="text-white/70">Solde à régler sur place :</span>
                      <span className="text-[#D4AF37] font-medium">{bookingDetails.remainingAmount}€</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="bg-[#D4AF37]/5 border-[#D4AF37]/20 mb-8">
          <CardContent className="p-8">
            <h2 className="text-white text-2xl font-semibold mb-6">Prochaines étapes</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail size={24} className="text-black" />
                </div>
                <h3 className="text-white font-medium mb-2">Confirmation par email</h3>
                <p className="text-white/70 text-sm">
                  Vous allez recevoir un email de confirmation avec tous les détails
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone size={24} className="text-black" />
                </div>
                <h3 className="text-white font-medium mb-2">Rappel J-1</h3>
                <p className="text-white/70 text-sm">
                  Nous vous appellerons la veille pour confirmer le rendez-vous
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={24} className="text-black" />
                </div>
                <h3 className="text-white font-medium mb-2">Intervention</h3>
                <p className="text-white/70 text-sm">
                  Notre équipe interviendra à l'heure prévue
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact & Actions */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6 text-center">
              <h3 className="text-white text-lg font-semibold mb-4">Besoin de modifier ?</h3>
              <p className="text-white/70 text-sm mb-6">
                Vous pouvez modifier ou annuler votre réservation jusqu'à 24h avant l'intervention
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  variant="outline" 
                  className="border-white/20 text-white hover:bg-white/5"
                  asChild
                >
                  <a href="tel:+33123456789">
                    <Phone size={16} className="mr-2" />
                    01 23 45 67 89
                  </a>
                </Button>
                <Button 
                  variant="outline" 
                  className="border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10"
                  asChild
                >
                  <a href="https://wa.me/33123456789" target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6 text-center">
              <h3 className="text-white text-lg font-semibold mb-4">Téléchargements</h3>
              <p className="text-white/70 text-sm mb-6">
                Ajoutez l'événement à votre calendrier ou téléchargez votre reçu
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  className="bg-[#D4AF37] hover:bg-[#B8941F] text-black"
                  onClick={() => {
                    // Generate ICS file
                    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${bookingDetails.date.replace(/-/g, '')}T${bookingDetails.time.replace(':', '')}00
DTEND:${bookingDetails.date.replace(/-/g, '')}T${(parseInt(bookingDetails.time.split(':')[0]) + 2).toString().padStart(2, '0')}${bookingDetails.time.split(':')[1]}00
SUMMARY:AS Prestige Care - ${bookingDetails.service}
DESCRIPTION:Nettoyage automobile premium à domicile
LOCATION:${bookingDetails.address}
END:VEVENT
END:VCALENDAR`
                    
                    const blob = new Blob([icsContent], { type: 'text/calendar' })
                    const url = URL.createObjectURL(blob)
                    const a = document.createElement('a')
                    a.href = url
                    a.download = 'asprestigecare-rdv.ics'
                    a.click()
                  }}
                >
                  <Download size={16} className="mr-2" />
                  Calendrier (.ics)
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white/20 text-white hover:bg-white/5"
                >
                  <Download size={16} className="mr-2" />
                  Reçu PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Return Home */}
        <div className="text-center mt-12">
          <Button 
            asChild
            size="lg" 
            className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-medium px-8 py-4 rounded-full"
          >
            <Link href="/">Retour à l'accueil</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}