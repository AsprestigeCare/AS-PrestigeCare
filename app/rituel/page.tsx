import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Droplets, Shield, Sparkles, CheckCircle, Clock } from 'lucide-react'
import Link from 'next/link'

const rituelSteps = [
  {
    number: 1,
    title: "Préparation & Aspiration",
    description: "Retrait des accessoires, tapis et housses. Aspiration méticuleuse de tous les recoins avec nos aspirateurs professionnels haute puissance.",
    duration: "15-20 min",
    tools: ["Aspirateurs Kärcher Pro", "Brosses spécialisées", "Compresseur"],
    icon: <Droplets className="w-8 h-8" />
  },
  {
    number: 2,
    title: "Nettoyage des Surfaces",
    description: "Application de nos produits biodégradables sur tableau de bord, console centrale, portes et vide-poches. Techniques adaptées à chaque matériau.",
    duration: "25-30 min",
    tools: ["Produits pH neutre", "Microfibres premium", "Pinceaux détailing"],
    icon: <Shield className="w-8 h-8" />
  },
  {
    number: 3,
    title: "Traitement Sièges & Tissus",
    description: "Nettoyage et désinfection des sièges, appuie-têtes et surfaces textiles. Traitement anti-taches et désodorisant naturel.",
    duration: "20-25 min",
    tools: ["Injecteur-extracteur", "Mousses actives", "Désinfectant naturel"],
    icon: <Sparkles className="w-8 h-8" />
  },
  {
    number: 4,
    title: "Finitions & Brillance",
    description: "Application de notre protection cuir/plastique, nettoyage des vitres intérieures et finitions des détails chromés.",
    duration: "15-20 min",
    tools: ["Cires naturelles", "Nettoyant vitres", "Chiffons chamoisés"],
    icon: <CheckCircle className="w-8 h-8" />
  },
  {
    number: 5,
    title: "Contrôle Qualité",
    description: "Inspection finale point par point, vérification de la propreté et remontage soigné de tous les éléments démontés.",
    duration: "10-15 min",
    tools: ["Check-list qualité", "Éclairage LED", "Parfum signature"],
    icon: <Clock className="w-8 h-8" />
  }
]

const ecoFeatures = [
  {
    title: "Moins de 30L d'eau",
    description: "95% d'économie vs lavage traditionnel",
    icon: <Droplets className="w-6 h-6 text-blue-400" />
  },
  {
    title: "Véhicule Crit'Air 0",
    description: "100% électrique, zéro émission",
    icon: <Shield className="w-6 h-6 text-green-400" />
  },
  {
    title: "Produits biodégradables",
    description: "Formules respectueuses de l'environnement",
    icon: <Sparkles className="w-6 h-6 text-[#D4AF37]" />
  }
]

export default function RituelPage() {
  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Badge className="bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20 mb-6">
            🏆 Notre Savoir-Faire
          </Badge>
          
          <h1 className="font-playfair text-5xl lg:text-6xl font-light text-white mb-6">
            Notre Rituel
            <span className="text-[#D4AF37] block">en 5 Gestes</span>
          </h1>
          
          <p className="text-xl text-white/70 mb-8 max-w-3xl mx-auto">
            Découvrez notre processus de nettoyage premium, fruit de plusieurs années d'expertise 
            dans le car detailing haut de gamme. Chaque étape est pensée pour révéler la beauté de votre véhicule.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {ecoFeatures.map((feature, index) => (
              <div key={index} className="flex items-center bg-white/5 rounded-full px-6 py-3 backdrop-blur-sm">
                {feature.icon}
                <div className="ml-3">
                  <div className="text-white font-medium text-sm">{feature.title}</div>
                  <div className="text-white/60 text-xs">{feature.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {rituelSteps.map((step, index) => (
              <div key={index} className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12`}>
                {/* Image */}
                <div className="flex-1 relative">
                  <div className="aspect-video bg-white/5 rounded-2xl overflow-hidden border border-white/10">
                    <Image
                      src={`https://images.pexels.com/photos/${
                        index === 0 ? '3595113' :
                        index === 1 ? '3593922' :
                        index === 2 ? '3954225' :
                        index === 3 ? '919073' : '3954062'
                      }/pexels-photo-${
                        index === 0 ? '3595113' :
                        index === 1 ? '3593922' :
                        index === 2 ? '3954225' :
                        index === 3 ? '919073' : '3954062'
                      }.jpeg`}
                      alt={step.title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>
                  
                  {/* Step Number Badge */}
                  <div className="absolute -top-6 -left-6 w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-2xl">{step.number}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center">
                      <div className="text-[#D4AF37]">{step.icon}</div>
                    </div>
                    <Badge className="bg-white/5 text-white/70 border-white/20">
                      <Clock size={14} className="mr-1" />
                      {step.duration}
                    </Badge>
                  </div>

                  <h3 className="font-playfair text-3xl font-light text-white">
                    {step.title}
                  </h3>
                  
                  <p className="text-white/70 text-lg leading-relaxed">
                    {step.description}
                  </p>

                  <div>
                    <h4 className="text-white font-medium mb-3">Outils professionnels :</h4>
                    <div className="flex flex-wrap gap-2">
                      {step.tools.map((tool, toolIndex) => (
                        <Badge key={toolIndex} variant="outline" className="border-[#D4AF37]/30 text-[#D4AF37]">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Guarantee */}
      <section className="py-20 bg-[#1A1A1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={32} className="text-black" />
            </div>
            
            <h2 className="font-playfair text-3xl font-light text-white mb-6">
              Garantie Satisfaction
            </h2>
            
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              Notre rituel en 5 gestes est le fruit d'années d'expérience et de perfectionnement. 
              Chaque intervention est garantie 100% satisfaction ou nous revenons gratuitement.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#D4AF37] mb-2">100%</div>
                <div className="text-white/70 text-sm">Satisfaction client</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#D4AF37] mb-2">500+</div>
                <div className="text-white/70 text-sm">Véhicules traités</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#D4AF37] mb-2">4.9/5</div>
                <div className="text-white/70 text-sm">Note Google</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="font-playfair text-4xl font-light text-white mb-6">
            Prêt à Découvrir Notre Rituel ?
          </h2>
          <p className="text-xl text-white/70 mb-8">
            Réservez votre créneau et laissez nos experts révéler tout le potentiel de votre véhicule
          </p>
          
          <Button 
            asChild 
            size="lg"
            className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-medium px-8 py-4 rounded-full text-lg transition-all duration-200 hover:scale-105"
          >
            <Link href="/reserver">Réserver Maintenant</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}