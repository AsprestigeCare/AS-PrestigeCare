"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { ChevronLeft, ChevronRight, Play, Star, Calendar } from 'lucide-react'
import Link from 'next/link'

const beforeAfterImages = [
  {
    id: 1,
    title: "BMW Série 3 - Intérieur Premium",
    service: "Intérieur Premium",
    location: "Boulogne-Billancourt",
    date: "15 Nov 2024",
    before: "https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg",
    after: "https://images.pexels.com/photos/3593922/pexels-photo-3593922.jpeg",
    description: "Nettoyage complet d'un BMW Série 3 avec traitement cuir et désinfection complète"
  },
  {
    id: 2,
    title: "Audi Q5 - Complet Extérieur/Intérieur",
    service: "Extérieur + Intérieur",
    location: "Saint-Maur-des-Fossés",
    date: "12 Nov 2024",
    before: "https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg",
    after: "https://images.pexels.com/photos/919073/pexels-photo-919073.jpeg",
    description: "Rénovation complète d'un SUV avec soft polish et protection sealant"
  },
  {
    id: 3,
    title: "Mercedes Classe C - Polish & Sealant",
    service: "Soft Polish + Sealant",
    location: "Vincennes",
    date: "10 Nov 2024",
    before: "https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg",
    after: "https://images.pexels.com/photos/3954225/pexels-photo-3954225.jpeg",
    description: "Traitement de rénovation avec correction légère de la peinture et protection longue durée"
  },
  {
    id: 4,
    title: "Tesla Model 3 - VTC Zen",
    service: "VTC Zen 45min",
    location: "Paris 16ème",
    date: "8 Nov 2024",
    before: "https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg",
    after: "https://images.pexels.com/photos/3595113/pexels-photo-3595113.jpeg",
    description: "Service express pour véhicule VTC avec nettoyage intérieur rapide et efficace"
  },
  {
    id: 5,
    title: "Range Rover - Entretien Maison",
    service: "Intérieur + Canapé",
    location: "Neuilly-sur-Seine",
    date: "5 Nov 2024",
    before: "https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg",
    after: "https://images.pexels.com/photos/3954062/pexels-photo-3954062.jpeg",
    description: "Service premium avec nettoyage véhicule et canapé 3 places à domicile"
  },
  {
    id: 6,
    title: "Porsche Cayenne - Signature",
    service: "Service Signature",
    location: "Levallois-Perret",
    date: "3 Nov 2024",
    before: "https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg",
    after: "https://images.pexels.com/photos/919073/pexels-photo-919073.jpeg",
    description: "Traitement premium complet avec contrôle qualité et rapport détaillé"
  }
]

const videoTestimonials = [
  {
    id: 1,
    title: "Marie Dubois - Boulogne",
    thumbnail: "https://images.pexels.com/photos/3593922/pexels-photo-3593922.jpeg",
    rating: 5,
    preview: "Service impeccable, très professionnel..."
  },
  {
    id: 2,
    title: "Pierre Martin - VTC",
    thumbnail: "https://images.pexels.com/photos/3595113/pexels-photo-3595113.jpeg",
    rating: 5,
    preview: "Parfait pour ma flotte VTC..."
  }
]

export default function GaleriePage() {
  const [selectedImage, setSelectedImage] = useState<typeof beforeAfterImages[0] | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showBefore, setShowBefore] = useState(true)

  const openLightbox = (image: typeof beforeAfterImages[0], index: number) => {
    setSelectedImage(image)
    setCurrentIndex(index)
  }

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % beforeAfterImages.length
    setCurrentIndex(nextIndex)
    setSelectedImage(beforeAfterImages[nextIndex])
  }

  const prevImage = () => {
    const prevIndex = (currentIndex - 1 + beforeAfterImages.length) % beforeAfterImages.length
    setCurrentIndex(prevIndex)
    setSelectedImage(beforeAfterImages[prevIndex])
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20 mb-6">
            📸 Nos Réalisations
          </Badge>
          
          <h1 className="font-playfair text-5xl lg:text-6xl font-light text-white mb-6">
            Galerie
            <span className="text-[#D4AF37] block">Avant / Après</span>
          </h1>
          
          <p className="text-xl text-white/70 mb-8 max-w-3xl mx-auto">
            Découvrez la transformation spectaculaire de nos interventions. 
            Chaque véhicule raconte une histoire de renaissance et d'excellence.
          </p>
        </div>
      </section>

      {/* Before/After Gallery */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beforeAfterImages.map((item, index) => (
              <Card 
                key={item.id} 
                className="bg-white/5 border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer group"
                onClick={() => openLightbox(item, index)}
              >
                <div className="relative aspect-video">
                  <Image
                    src={item.after}
                    alt={item.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-[#D4AF37] text-black font-medium">
                      {item.service}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">▶</span>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-white/70 text-sm mb-3">{item.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-white/60">
                    <span className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {item.date}
                    </span>
                    <span>{item.location}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="py-20 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-light text-white mb-4">
              Témoignages Clients
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Ils ont testé nos services et partagent leur expérience
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {videoTestimonials.map((video) => (
              <Card key={video.id} className="bg-white/5 border-white/10 overflow-hidden hover:bg-white/10 transition-colors cursor-pointer group">
                <div className="relative aspect-video">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play size={24} className="text-black ml-1" />
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    <div className="flex space-x-1 mr-3">
                      {[...Array(video.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                      ))}
                    </div>
                    <h3 className="text-white font-semibold">{video.title}</h3>
                  </div>
                  <p className="text-white/70">{video.preview}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="font-playfair text-4xl font-light text-white mb-6">
            Votre Véhicule Mérite le Meilleur
          </h2>
          <p className="text-xl text-white/70 mb-8">
            Rejoignez nos clients satisfaits et découvrez la différence AS Prestige Care
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              size="lg"
              className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-medium px-8 py-4 rounded-full text-lg"
            >
              <Link href="/reserver">Réserver Mon Nettoyage</Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              asChild
              className="border-white/20 text-white hover:bg-white/5 px-8 py-4 rounded-full text-lg"
            >
              <Link href="/contact">Demander un Devis</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl bg-black/95 border-white/20">
          {selectedImage && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-white text-xl font-semibold">{selectedImage.title}</h2>
                <div className="flex items-center space-x-4">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={prevImage}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <ChevronLeft size={16} />
                  </Button>
                  <span className="text-white/70 text-sm">
                    {currentIndex + 1} / {beforeAfterImages.length}
                  </span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={nextImage}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <ChevronRight size={16} />
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="destructive">Avant</Badge>
                    <Button
                      size="sm"
                      variant={showBefore ? "default" : "outline"}
                      onClick={() => setShowBefore(true)}
                      className="text-xs"
                    >
                      Avant
                    </Button>
                  </div>
                  <div className="aspect-video relative rounded-lg overflow-hidden">
                    <Image
                      src={selectedImage.before}
                      alt="Avant nettoyage"
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-green-600">Après</Badge>
                    <Button
                      size="sm"
                      variant={!showBefore ? "default" : "outline"}
                      onClick={() => setShowBefore(false)}
                      className="text-xs"
                    >
                      Après
                    </Button>
                  </div>
                  <div className="aspect-video relative rounded-lg overflow-hidden">
                    <Image
                      src={selectedImage.after}
                      alt="Après nettoyage"
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-[#D4AF37] font-semibold">{selectedImage.service}</div>
                    <div className="text-white/60 text-sm">Service</div>
                  </div>
                  <div>
                    <div className="text-[#D4AF37] font-semibold">{selectedImage.location}</div>
                    <div className="text-white/60 text-sm">Lieu</div>
                  </div>
                  <div>
                    <div className="text-[#D4AF37] font-semibold">{selectedImage.date}</div>
                    <div className="text-white/60 text-sm">Date</div>
                  </div>
                  <div>
                    <div className="text-[#D4AF37] font-semibold">4.9/5</div>
                    <div className="text-white/60 text-sm">Note</div>
                  </div>
                </div>
                <p className="text-white/70 mt-4 text-center">{selectedImage.description}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}