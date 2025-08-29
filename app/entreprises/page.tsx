import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Truck, Users, Clock, Shield, TrendingUp, CheckCircle, Phone, Mail } from 'lucide-react'
import Link from 'next/link'

const vtcServices = [
  {
    title: "VTC Zen 45 minutes",
    price: "35€",
    originalPrice: "55€",
    description: "Service express optimisé pour véhicules de transport",
    features: [
      "Nettoyage intérieur complet",
      "Aspiration sièges et tapis",
      "Désinfection surfaces de contact",
      "Parfum signature discret",
      "Intervention sur site"
    ],
    duration: "45 min",
    suitable: "Parfait pour rotations VTC"
  },
  {
    title: "Pack Flotte Mensuel",
    price: "Sur devis",
    description: "Solution complète pour gestionnaires de flottes",
    features: [
      "Prix dégressif selon volume",
      "Planning optimisé",
      "Rapport de qualité détaillé",
      "Responsable dédié",
      "Facturation centralisée",
      "Service 7j/7"
    ],
    duration: "Variable",
    suitable: "Flottes de 5+ véhicules"
  },
  {
    title: "Maintenance Véhicules Commerciaux",
    price: "À partir de 80€",
    description: "Entretien adapté aux véhicules utilitaires",
    features: [
      "Nettoyage cabine conducteur",
      "Espace cargo sur demande",
      "Produits professionnels adaptés",
      "Intervention flexible",
      "Devis personnalisé"
    ],
    duration: "60-90 min",
    suitable: "Artisans, livreurs, commerciaux"
  }
]

const partnerBenefits = [
  {
    title: "Tarifs Préférentiels",
    description: "Remises importantes sur volume",
    icon: <TrendingUp className="w-8 h-8" />,
    stats: "Jusqu'à -40%"
  },
  {
    title: "Service Prioritaire",
    description: "Créneaux dédiés et réservation express",
    icon: <Clock className="w-8 h-8" />,
    stats: "7j/7 disponible"
  },
  {
    title: "Gestion Simplifiée",
    description: "Un interlocuteur unique et facturation centralisée",
    icon: <Users className="w-8 h-8" />,
    stats: "1 contact dédié"
  },
  {
    title: "Qualité Garantie",
    description: "Standards professionnels et contrôle qualité",
    icon: <Shield className="w-8 h-8" />,
    stats: "100% satisfaction"
  }
]

const testimonials = [
  {
    company: "Cab Premium Paris",
    manager: "David Rousseau",
    fleet: "15 véhicules VTC",
    testimonial: "Service irréprochable ! Nos véhicules sont toujours impeccables pour nos clients. L'équipe s'adapte parfaitement à nos contraintes d'exploitation.",
    rating: 5
  },
  {
    company: "Logistique Pro IDF",
    manager: "Sophie Martinet", 
    fleet: "25 véhicules commerciaux",
    testimonial: "Excellent rapport qualité-prix. Le service est professionnel et les équipes sont flexibles. Nos véhicules représentent notre image de marque.",
    rating: 5
  }
]

export default function EntreprisesPage() {
  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20 mb-6">
                🚗 Solutions Entreprises & Flottes
              </Badge>
              
              <h1 className="font-playfair text-5xl lg:text-6xl font-light text-white mb-6">
                Flottes VTC &
                <span className="text-[#D4AF37] block">Véhicules Pro</span>
              </h1>
              
              <p className="text-xl text-white/70 mb-8 leading-relaxed">
                Solutions sur-mesure pour professionnels : VTC, taxis, flottes d'entreprise et véhicules commerciaux. 
                Tarifs préférentiels, service prioritaire et gestion simplifiée.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  asChild 
                  size="lg"
                  className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-medium px-8 py-4 rounded-full text-lg"
                >
                  <Link href="#devis">Demander un Devis</Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white/20 text-white hover:bg-white/5 px-8 py-4 rounded-full text-lg"
                  asChild
                >
                  <a href="tel:+33123456789">01 23 45 67 89</a>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square relative rounded-2xl overflow-hidden">
                <Image
                  src="https://images.pexels.com/photos/3595113/pexels-photo-3595113.jpeg"
                  alt="Flotte VTC professionnelle"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/20 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#D4AF37] rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Professionnels */}
      <section className="py-20 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-light text-white mb-4">
              Services Dédiés aux Professionnels
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Des solutions adaptées à chaque type de véhicule professionnel
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {vtcServices.map((service, index) => (
              <Card key={index} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <Truck className="w-8 h-8 text-[#D4AF37]" />
                    <Badge className="bg-[#D4AF37] text-black font-medium">
                      {service.price}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-white">{service.title}</CardTitle>
                  {service.originalPrice && (
                    <div className="flex items-center gap-2">
                      <span className="text-white/50 line-through text-sm">{service.originalPrice}</span>
                      <Badge variant="secondary" className="bg-green-500/10 text-green-400 border-green-500/20 text-xs">
                        -36%
                      </Badge>
                    </div>
                  )}
                  <p className="text-white/70 text-sm">{service.description}</p>
                </CardHeader>

                <CardContent className="pt-0">
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm text-white/80">
                        <CheckCircle size={16} className="text-[#D4AF37] mr-2 mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex items-center justify-between text-sm text-white/60 mb-4">
                    <span className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      {service.duration}
                    </span>
                    <span>{service.suitable}</span>
                  </div>
                  
                  <Button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20">
                    Demander un Devis
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Avantages Partenaires */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-light text-white mb-4">
              Avantages Partenaires
            </h2>
            <p className="text-xl text-white/70">
              Pourquoi les professionnels nous font confiance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partnerBenefits.map((benefit, index) => (
              <Card key={index} className="bg-white/5 border-white/10 text-center hover:bg-white/10 transition-colors">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-[#D4AF37]">{benefit.icon}</div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
                  <p className="text-white/70 mb-4">{benefit.description}</p>
                  <Badge className="bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/30">
                    {benefit.stats}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Optimisé */}
      <section className="py-20 bg-[#1A1A1A]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-light text-white mb-4">
              Process Optimisé Professionnels
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: 1, title: "Contact", desc: "Analyse de vos besoins et devis personnalisé" },
              { step: 2, title: "Planification", desc: "Organisation des créneaux selon vos contraintes" },
              { step: 3, title: "Intervention", desc: "Service professionnel sur vos sites ou micro-hubs" },
              { step: 4, title: "Suivi", desc: "Rapport qualité et facturation centralisée" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-black font-bold text-xl">{item.step}</span>
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-white/70 text-sm">{item.desc}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-[#D4AF37]/30 transform -translate-x-8"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages Entreprises */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-light text-white mb-4">
              Ils Nous Font Confiance
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/5 border-white/10">
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-white font-semibold text-lg">{testimonial.company}</h4>
                      <p className="text-[#D4AF37] text-sm">{testimonial.manager}</p>
                      <p className="text-white/60 text-sm">{testimonial.fleet}</p>
                    </div>
                    <div className="flex space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <div key={i} className="w-4 h-4 bg-[#D4AF37] rounded-full"></div>
                      ))}
                    </div>
                  </div>
                  <p className="text-white/80 italic">"{testimonial.testimonial}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Entreprises */}
      <section id="devis" className="py-20 bg-gradient-to-r from-[#D4AF37]/10 to-[#B8941F]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <h2 className="font-playfair text-3xl font-light text-white mb-6">
                Demande de Devis Professionnel
              </h2>
              <p className="text-white/70 mb-8">
                Contactez notre équipe dédiée aux entreprises pour une solution sur-mesure
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center justify-center bg-white/5 rounded-lg p-4">
                  <Phone className="text-[#D4AF37] mr-3" size={20} />
                  <div className="text-left">
                    <div className="text-white font-medium">Ligne Directe Pro</div>
                    <a href="tel:+33123456789" className="text-[#D4AF37] hover:underline">
                      01 23 45 67 89
                    </a>
                  </div>
                </div>
                <div className="flex items-center justify-center bg-white/5 rounded-lg p-4">
                  <Mail className="text-[#D4AF37] mr-3" size={20} />
                  <div className="text-left">
                    <div className="text-white font-medium">Email Entreprises</div>
                    <a href="mailto:pro@asprestigecare.fr" className="text-[#D4AF37] hover:underline">
                      pro@asprestigecare.fr
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-medium px-8 py-4 rounded-full"
                  asChild
                >
                  <a href="tel:+33123456789">Appeler Maintenant</a>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white/20 text-white hover:bg-white/5 px-8 py-4 rounded-full"
                  asChild
                >
                  <a href="mailto:pro@asprestigecare.fr">Envoyer un Email</a>
                </Button>
              </div>
              
              <p className="text-white/50 text-sm mt-6">
                Réponse sous 24h • Devis gratuit • Intervention en Île-de-France
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}