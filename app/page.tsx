import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, Shield, Droplets, Clock, MapPin, Phone } from 'lucide-react'

export default function HomePage() {
  const services = [
    {
      name: "Intérieur Premium",
      price: "100€",
      duration: "90 min",
      description: "Nettoyage complet intérieur avec produits biodégradables",
      features: ["Aspiration complète", "Nettoyage des surfaces", "Traitement cuir/tissus"]
    },
    {
      name: "Extérieur + Intérieur",
      price: "220€", 
      duration: "3h",
      description: "Service complet intérieur et extérieur",
      features: ["Lavage extérieur", "Intérieur Premium", "Cires de protection"]
    },
    {
      name: "Soft Polish + Sealant",
      price: "240€",
      duration: "4h", 
      description: "Rénovation et protection longue durée",
      features: ["Polish léger", "Sealant protecteur", "Brillance longue durée"]
    }
  ]

  const testimonials = [
    {
      name: "Marie D.",
      rating: 5,
      comment: "Service impeccable ! Mon véhicule n'avait jamais été aussi propre. L'équipe est très professionnelle.",
      location: "Boulogne-Billancourt"
    },
    {
      name: "Jean-Pierre M.",
      rating: 5,
      comment: "Très pratique de pouvoir faire nettoyer sa voiture à domicile. Résultat parfait, je recommande vivement.",
      location: "Saint-Maur-des-Fossés" 
    },
    {
      name: "Sophie L.",
      rating: 5,
      comment: "Approche écologique et résultat professionnel. Parfait pour les familles soucieuses de l'environnement.",
      location: "Vincennes"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0F0F0F] to-[#1A1A1A] pt-16 pb-24">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3593922/pexels-photo-3593922.jpeg')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <Badge className="bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20 mb-6">
                🌱 Crit'Air 0 - Moins de 30L d'eau par véhicule
              </Badge>
              
              <h1 className="font-playfair text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
                Nettoyage Auto
                <span className="text-[#D4AF37] block">Premium</span>
                <span className="text-3xl lg:text-4xl text-white/80 block mt-2">à Domicile</span>
              </h1>
              
              <p className="text-xl text-white/70 mb-8 leading-relaxed max-w-2xl">
                Service de car detailing haut de gamme en Île-de-France. 
                Respectueux de l'environnement avec nos produits biodégradables et notre consommation d'eau réduite.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  asChild 
                  size="lg"
                  className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-medium px-8 py-4 rounded-full text-lg transition-all duration-200 hover:scale-105"
                >
                  <Link href="/reserver">Réserver Maintenant</Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white/20 text-white hover:bg-white/5 px-8 py-4 rounded-full text-lg"
                  asChild
                >
                  <Link href="/rituel">Découvrir Notre Rituel</Link>
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-white/10">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#D4AF37]">500+</div>
                  <div className="text-sm text-white/60">Véhicules traités</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#D4AF37]">4.9/5</div>
                  <div className="text-sm text-white/60">Note moyenne</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#D4AF37]">30L</div>
                  <div className="text-sm text-white/60">Eau/véhicule</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.pexels.com/photos/3593922/pexels-photo-3593922.jpeg"
                  alt="Nettoyage automobile premium"
                  width={600}
                  height={400}
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/20 to-transparent"></div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#D4AF37] rounded-full opacity-20"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#D4AF37] rounded-full opacity-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-[#0F0F0F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-light text-white mb-4">
              Pourquoi Choisir AS Prestige Care ?
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Une approche premium et écologique du nettoyage automobile
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-[#D4AF37]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">À Domicile</h3>
                <p className="text-white/70">
                  Service directement chez vous, au bureau ou dans nos micro-hubs
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Droplets className="w-8 h-8 text-[#D4AF37]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Écologique</h3>
                <p className="text-white/70">
                  Moins de 30L d'eau, produits biodégradables, véhicule Crit'Air 0
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-[#D4AF37]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Premium</h3>
                <p className="text-white/70">
                  Produits haut de gamme, techniques professionnelles certifiées
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-[#D4AF37]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Flexible</h3>
                <p className="text-white/70">
                  Réservation en ligne, créneaux adaptés à vos disponibilités
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-light text-white mb-4">
              Nos Services Premium
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Des prestations adaptées à tous vos besoins, du simple entretien à la rénovation complète
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-semibold text-white">{service.name}</h3>
                    <Badge className="bg-[#D4AF37] text-black font-medium">
                      {service.price}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center text-[#D4AF37] mb-4">
                    <Clock size={16} className="mr-2" />
                    <span className="text-sm">{service.duration}</span>
                  </div>
                  
                  <p className="text-white/70 mb-6">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-2 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-white/80">
                        <div className="w-2 h-2 bg-[#D4AF37] rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    asChild 
                    className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-black font-medium"
                  >
                    <Link href="/reserver">Réserver</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild className="border-white/20 text-white hover:bg-white/5">
              <Link href="/abonnements">Découvrir nos Abonnements</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-[#0F0F0F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-light text-white mb-4">
              Ce Que Disent Nos Clients
            </h2>
            <div className="flex justify-center items-center space-x-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-[#D4AF37] text-[#D4AF37]" />
              ))}
              <span className="ml-3 text-white/70">4.9/5 sur Google</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/5 border-white/10">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-semibold text-white">{testimonial.name}</h4>
                      <p className="text-sm text-[#D4AF37]">{testimonial.location}</p>
                    </div>
                    <div className="flex space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                      ))}
                    </div>
                  </div>
                  <p className="text-white/70">"{testimonial.comment}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-[#D4AF37]/10 to-[#B8941F]/10">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="font-playfair text-4xl font-light text-white mb-6">
            Prêt à Redécouvrir Votre Véhicule ?
          </h2>
          <p className="text-xl text-white/70 mb-8">
            Réservez votre créneau en moins de 3 minutes. Dépôt de garantie de 20€, solde réglé sur place.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              asChild 
              size="lg"
              className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-medium px-8 py-4 rounded-full text-lg"
            >
              <Link href="/reserver">Réserver Maintenant</Link>
            </Button>
            
            <div className="flex items-center text-white/70">
              <Phone size={18} className="mr-2" />
              <a href="tel:+33123456789" className="hover:text-[#D4AF37] transition-colors">
                01 23 45 67 89
              </a>
            </div>
          </div>
          
          <p className="text-sm text-white/50 mt-6">
            Intervention en Île-de-France • Devis gratuit • Satisfaction garantie
          </p>
        </div>
      </section>
    </div>
  )
}