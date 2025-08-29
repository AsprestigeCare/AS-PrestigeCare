"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, Star, Clock, Euro } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

const SUBSCRIPTION_PLANS = [
  {
    id: 'vtc-zen',
    name: 'VTC Zen',
    price: 45,
    originalPrice: 60,
    description: '1 service mensuel VTC Zen 45 minutes',
    features: [
      'Service VTC Zen 45 min/mois',
      'Nettoyage intérieur express',
      'Planification flexible',
      'Support prioritaire',
      'Annulation gratuite J-1'
    ],
    popular: false,
    savings: '25% d\'économies',
    color: 'bg-blue-500'
  },
  {
    id: 'entretien-maison',
    name: 'Entretien Maison',
    price: 59,
    originalPrice: 120,
    description: 'Intérieur Premium + 30 min canapé mensuel',
    features: [
      'Intérieur Premium mensuel',
      'Nettoyage canapé 3 places (30 min)',
      'Produits tissus d\'ameublement',
      'Devis gratuit rénovation',
      'Intervention à domicile',
      'Garantie satisfaction'
    ],
    popular: true,
    savings: '51% d\'économies',
    color: 'bg-[#D4AF37]'
  },
  {
    id: 'signature',
    name: 'Signature',
    price: 99,
    originalPrice: 150,
    description: 'Intérieur Premium + contrôle trimestriel',
    features: [
      'Intérieur Premium mensuel',
      'Contrôle qualité trimestriel',
      'Intervention corrective gratuite',
      'Conseiller dédié',
      'Accès prioritaire nouveaux services',
      'Remise 20% services additionnels',
      'Rapport détaillé véhicule'
    ],
    popular: false,
    savings: '34% d\'économies',
    color: 'bg-purple-500'
  }
]

export default function AbonnementsPage() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)

  const handleSubscribe = async (planId: string) => {
    setLoadingPlan(planId)
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planId }),
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la création de l\'abonnement')
      }

      const { sessionUrl } = await response.json()
      
      // Redirect to Stripe checkout
      window.location.href = sessionUrl
      
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création de l'abonnement. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setLoadingPlan(null)
    }
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F] py-12">
      {/* Hero Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20 mb-6">
            🏆 Nos Abonnements Premium
          </Badge>
          
          <h1 className="font-playfair text-5xl font-light text-white mb-6">
            Abonnements 
            <span className="text-[#D4AF37] block">Prestige Care</span>
          </h1>
          
          <p className="text-xl text-white/70 mb-8 max-w-3xl mx-auto leading-relaxed">
            Bénéficiez d'un entretien régulier de votre véhicule avec des tarifs préférentiels. 
            Résiliable à tout moment, sans engagement.
          </p>
        </div>
      </section>

      {/* Subscription Plans */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {SUBSCRIPTION_PLANS.map((plan) => (
              <Card 
                key={plan.id} 
                className={`bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 relative ${
                  plan.popular ? 'ring-2 ring-[#D4AF37] hover:scale-105' : 'hover:scale-105'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-[#D4AF37] text-black font-medium px-4 py-1">
                      <Star size={12} className="mr-1" />
                      Plus populaire
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-6">
                  <div className={`w-16 h-16 ${plan.color} rounded-full flex items-center justify-center mx-auto mb-4 opacity-80`}>
                    <span className="text-white font-bold text-xl">{plan.name.charAt(0)}</span>
                  </div>
                  
                  <CardTitle className="text-2xl text-white font-light">{plan.name}</CardTitle>
                  
                  <div className="mt-4">
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <span className="text-4xl font-bold text-[#D4AF37]">{plan.price}€</span>
                      <div className="text-left">
                        <div className="text-sm text-white/50 line-through">{plan.originalPrice}€</div>
                        <div className="text-sm text-white/70">/mois</div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-green-500/10 text-green-400 border-green-500/20">
                      {plan.savings}
                    </Badge>
                  </div>
                  
                  <p className="text-white/70 mt-4">{plan.description}</p>
                </CardHeader>

                <CardContent className="px-6 pb-8">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check size={16} className="text-[#D4AF37] mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-white/80 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-[#D4AF37] hover:bg-[#B8941F] text-black' 
                        : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                    } font-medium py-3 rounded-full transition-all duration-200`}
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={loadingPlan === plan.id}
                  >
                    {loadingPlan === plan.id ? 'Traitement...' : 'S\'abonner'}
                  </Button>
                  
                  <p className="text-center text-white/50 text-xs mt-3">
                    Sans engagement • Résiliable à tout moment
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-[#1A1A1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-playfair text-4xl font-light text-white text-center mb-12">
            Questions Fréquentes
          </h2>
          
          <div className="grid gap-6">
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <h3 className="text-white font-medium mb-3">Comment fonctionne l'abonnement ?</h3>
                <p className="text-white/70">
                  Votre abonnement se renouvelle automatiquement chaque mois. Vous pouvez planifier 
                  vos interventions selon vos disponibilités via notre plateforme en ligne.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <h3 className="text-white font-medium mb-3">Puis-je suspendre mon abonnement ?</h3>
                <p className="text-white/70">
                  Oui, vous pouvez suspendre temporairement votre abonnement (vacances, absence) 
                  ou le résilier définitivement sans frais depuis votre espace client.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <h3 className="text-white font-medium mb-3">Que se passe-t-il si je ne peux pas recevoir le service un mois ?</h3>
                <p className="text-white/70">
                  Les services non utilisés peuvent être reportés au mois suivant ou échangés 
                  contre d'autres prestations de valeur équivalente.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="font-playfair text-3xl font-light text-white mb-6">
            Prêt à Rejoindre nos Abonnés Prestige ?
          </h2>
          <p className="text-lg text-white/70 mb-8">
            Bénéficiez d'un entretien professionnel régulier avec des économies substantielles
          </p>
          <Button 
            asChild 
            size="lg"
            className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-medium px-8 py-4 rounded-full"
          >
            <a href="#plans">Choisir Mon Abonnement</a>
          </Button>
        </div>
      </section>
    </div>
  )
}