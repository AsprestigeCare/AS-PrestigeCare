"use client"

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Star, Calendar, Shield, Gift } from 'lucide-react'
import Link from 'next/link'

export default function SubscriptionSuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [subscriptionDetails, setSubscriptionDetails] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSubscriptionDetails = async () => {
      if (sessionId) {
        // Simulate API call to get subscription details
        setTimeout(() => {
          setSubscriptionDetails({
            id: 'sub_1234567890',
            plan: 'Entretien Maison',
            price: 59,
            interval: 'month',
            nextBilling: '2024-12-20',
            customerEmail: 'client@example.com',
            status: 'active'
          })
          setIsLoading(false)
        }, 1000)
      } else {
        setIsLoading(false)
      }
    }

    fetchSubscriptionDetails()
  }, [sessionId])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
        <div className="text-white">Activation de votre abonnement...</div>
      </div>
    )
  }

  if (!subscriptionDetails) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
        <Card className="bg-white/5 border-white/10 p-8 text-center max-w-md">
          <CardContent>
            <h1 className="text-white text-2xl font-bold mb-4">Abonnement introuvable</h1>
            <p className="text-white/70 mb-6">
              Nous n'avons pas pu trouver les détails de votre abonnement.
            </p>
            <Button asChild className="bg-[#D4AF37] hover:bg-[#B8941F] text-black">
              <Link href="/abonnements">Voir nos abonnements</Link>
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
          <div className="w-20 h-20 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-6">
            <Star size={40} className="text-black" />
          </div>
          
          <h1 className="font-playfair text-4xl font-light text-white mb-4">
            Abonnement Activé !
          </h1>
          
          <p className="text-xl text-white/70 mb-6">
            Bienvenue dans l'univers AS Prestige Care Premium
          </p>
          
          <Badge className="bg-[#D4AF37] text-black text-lg px-6 py-2 font-medium">
            {subscriptionDetails.plan} - {subscriptionDetails.price}€/mois
          </Badge>
        </div>

        {/* Subscription Details */}
        <Card className="bg-white/5 border-white/10 mb-8">
          <CardContent className="p-8">
            <h2 className="text-white text-2xl font-semibold mb-6">Détails de votre abonnement</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-white font-medium mb-2">Plan sélectionné</h3>
                  <p className="text-[#D4AF37] text-xl font-semibold">{subscriptionDetails.plan}</p>
                  <p className="text-white/70">{subscriptionDetails.price}€ par mois</p>
                </div>

                <div>
                  <h3 className="text-white font-medium mb-2">Prochaine facturation</h3>
                  <p className="text-white/70">
                    {new Date(subscriptionDetails.nextBilling).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>

                <div>
                  <h3 className="text-white font-medium mb-2">Statut</h3>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    Actif
                  </Badge>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-6">
                <h3 className="text-white font-medium mb-4">Vos avantages inclus</h3>
                <div className="space-y-3">
                  {subscriptionDetails.plan === 'VTC Zen' && [
                    '1 service VTC Zen mensuel',
                    'Nettoyage intérieur express',
                    'Planification flexible',
                    'Support prioritaire'
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle size={16} className="text-[#D4AF37]" />
                      <span className="text-white/80 text-sm">{benefit}</span>
                    </div>
                  ))}
                  
                  {subscriptionDetails.plan === 'Entretien Maison' && [
                    'Intérieur Premium mensuel',
                    'Nettoyage canapé 3 places',
                    'Produits tissus d\'ameublement',
                    'Intervention à domicile',
                    'Devis gratuit rénovation'
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle size={16} className="text-[#D4AF37]" />
                      <span className="text-white/80 text-sm">{benefit}</span>
                    </div>
                  ))}
                  
                  {subscriptionDetails.plan === 'Signature' && [
                    'Intérieur Premium mensuel',
                    'Contrôle qualité trimestriel',
                    'Conseiller dédié',
                    'Remise 20% services additionnels',
                    'Rapport détaillé véhicule'
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle size={16} className="text-[#D4AF37]" />
                      <span className="text-white/80 text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Getting Started */}
        <Card className="bg-[#D4AF37]/5 border-[#D4AF37]/20 mb-8">
          <CardContent className="p-8">
            <h2 className="text-white text-2xl font-semibold mb-6">Comment utiliser votre abonnement</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar size={24} className="text-black" />
                </div>
                <h3 className="text-white font-medium mb-2">1. Planifiez</h3>
                <p className="text-white/70 text-sm">
                  Réservez votre service mensuel selon vos disponibilités
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield size={24} className="text-black" />
                </div>
                <h3 className="text-white font-medium mb-2">2. Profitez</h3>
                <p className="text-white/70 text-sm">
                  Bénéficiez de votre service premium à tarif avantageux
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift size={24} className="text-black" />
                </div>
                <h3 className="text-white font-medium mb-2">3. Économisez</h3>
                <p className="text-white/70 text-sm">
                  Accédez aux services additionnels avec remise abonné
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6 text-center">
              <h3 className="text-white text-lg font-semibold mb-4">Réserver votre premier service</h3>
              <p className="text-white/70 text-sm mb-6">
                Planifiez dès maintenant votre première intervention premium
              </p>
              <Button 
                asChild
                className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-medium px-6 py-3 rounded-full"
              >
                <Link href="/reserver">Réserver Maintenant</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6 text-center">
              <h3 className="text-white text-lg font-semibold mb-4">Gérer votre abonnement</h3>
              <p className="text-white/70 text-sm mb-6">
                Accédez à votre portail client Stripe pour gérer votre abonnement
              </p>
              <Button 
                variant="outline"
                className="border-white/20 text-white hover:bg-white/5 px-6 py-3 rounded-full"
                onClick={() => {
                  // In a real app, this would redirect to Stripe Customer Portal
                  window.open('https://billing.stripe.com/p/login/test_123', '_blank')
                }}
              >
                Portail Client
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Contact */}
        <Card className="bg-white/5 border-white/10 mb-8">
          <CardContent className="p-8 text-center">
            <h3 className="text-white text-xl font-semibold mb-4">Besoin d'aide ?</h3>
            <p className="text-white/70 mb-6">
              Notre équipe dédiée aux abonnés est à votre disposition pour toute question
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline"
                className="border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10"
                asChild
              >
                <a href="tel:+33123456789">01 23 45 67 89</a>
              </Button>
              <Button 
                variant="outline"
                className="border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10"
                asChild
              >
                <a href="mailto:abonnes@asprestigecare.fr">abonnes@asprestigecare.fr</a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Return Home */}
        <div className="text-center">
          <Button 
            asChild
            size="lg" 
            variant="outline"
            className="border-white/20 text-white hover:bg-white/5 px-8 py-4 rounded-full"
          >
            <Link href="/">Retour à l'accueil</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}