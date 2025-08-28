"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { toast } from '@/hooks/use-toast'
import { Phone, Mail, MapPin, Clock, MessageCircle, Star } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    toast({
      title: "Message envoyé !",
      description: "Nous vous répondrons dans les plus brefs délais.",
    })
    
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    setIsLoading(false)
  }

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20 mb-6">
            📞 Nous Contacter
          </Badge>
          
          <h1 className="font-playfair text-5xl lg:text-6xl font-light text-white mb-6">
            Contact &
            <span className="text-[#D4AF37] block">Support Client</span>
          </h1>
          
          <p className="text-xl text-white/70 mb-8 max-w-3xl mx-auto">
            Une question ? Besoin d'informations ? Notre équipe est là pour vous accompagner 
            et vous fournir le meilleur service possible.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Methods */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-xl">Nous Joindre</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Téléphone</h3>
                    <a 
                      href="tel:+33123456789" 
                      className="text-[#D4AF37] hover:underline transition-colors"
                    >
                      01 23 45 67 89
                    </a>
                    <p className="text-white/60 text-sm mt-1">
                      Lun-Dim 8h-20h
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">WhatsApp</h3>
                    <a 
                      href="https://wa.me/33123456789" 
                      className="text-[#D4AF37] hover:underline transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      +33 1 23 45 67 89
                    </a>
                    <p className="text-white/60 text-sm mt-1">
                      Réponse rapide
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Email</h3>
                    <a 
                      href="mailto:contact@asprestigecare.fr" 
                      className="text-[#D4AF37] hover:underline transition-colors"
                    >
                      contact@asprestigecare.fr
                    </a>
                    <p className="text-white/60 text-sm mt-1">
                      Réponse sous 24h
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Zone d'intervention</h3>
                    <p className="text-white/70">
                      Île-de-France<br />
                      Zones 1, 2, 3, 4
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hours */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-xl flex items-center">
                  <Clock className="w-5 h-5 text-[#D4AF37] mr-2" />
                  Horaires
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/70">Lundi - Vendredi</span>
                  <span className="text-white">8h00 - 20h00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Samedi</span>
                  <span className="text-white">9h00 - 18h00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Dimanche</span>
                  <span className="text-white">10h00 - 17h00</span>
                </div>
                <div className="pt-3 border-t border-white/10">
                  <p className="text-white/60 text-sm">
                    Interventions 7j/7 sur rendez-vous
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Google Reviews */}
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center space-x-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
                  ))}
                </div>
                <div className="text-2xl font-bold text-[#D4AF37] mb-1">4.9/5</div>
                <p className="text-white/70 text-sm mb-4">Plus de 150 avis Google</p>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10"
                  asChild
                >
                  <a href="https://g.page/r/YOUR_GOOGLE_REVIEW_LINK" target="_blank" rel="noopener noreferrer">
                    Voir les avis
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Envoyez-nous un Message</CardTitle>
                <p className="text-white/70">
                  Décrivez votre demande et nous vous répondrons rapidement
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-white">Nom complet *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => updateFormData('name', e.target.value)}
                        className="bg-white/5 border-white/20 text-white mt-2"
                        placeholder="Votre nom et prénom"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-white">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateFormData('email', e.target.value)}
                        className="bg-white/5 border-white/20 text-white mt-2"
                        placeholder="votre@email.fr"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone" className="text-white">Téléphone</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => updateFormData('phone', e.target.value)}
                        className="bg-white/5 border-white/20 text-white mt-2"
                        placeholder="06 12 34 56 78"
                      />
                    </div>
                    <div>
                      <Label htmlFor="subject" className="text-white">Sujet *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => updateFormData('subject', e.target.value)}
                        className="bg-white/5 border-white/20 text-white mt-2"
                        placeholder="Objet de votre demande"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-white">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => updateFormData('message', e.target.value)}
                      className="bg-white/5 border-white/20 text-white mt-2"
                      placeholder="Décrivez votre demande, questions ou commentaires..."
                      rows={6}
                      required
                    />
                  </div>

                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <h4 className="text-white font-medium mb-2">Vous préférez nous appeler ?</h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        className="border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10"
                        asChild
                      >
                        <a href="tel:+33123456789">
                          <Phone size={16} className="mr-2" />
                          Appeler
                        </a>
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10"
                        asChild
                      >
                        <a href="https://wa.me/33123456789" target="_blank" rel="noopener noreferrer">
                          <MessageCircle size={16} className="mr-2" />
                          WhatsApp
                        </a>
                      </Button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isLoading}
                    className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-black font-medium py-3 rounded-full"
                  >
                    {isLoading ? 'Envoi en cours...' : 'Envoyer le Message'}
                  </Button>

                  <p className="text-white/60 text-sm text-center">
                    En envoyant ce message, vous acceptez notre politique de confidentialité. 
                    Nous nous engageons à ne pas partager vos données.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="py-20 bg-[#1A1A1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-light text-white mb-4">
              Questions Fréquentes
            </h2>
            <p className="text-xl text-white/70">
              Trouvez rapidement les réponses à vos questions
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "Dans quelles zones intervenez-vous ?",
                answer: "Nous intervenons dans toute l'Île-de-France, répartie en 4 zones : Zone 1 (93), Zone 2 (92), Zone 3 (91), Zone 4 (77). Chaque zone a des créneaux dédiés pour optimiser nos interventions."
              },
              {
                question: "Comment se déroule le paiement ?",
                answer: "Nous demandons un dépôt de 20€ lors de la réservation pour sécuriser votre créneau. Le solde est réglé directement sur place après l'intervention, par carte bancaire ou espèces."
              },
              {
                question: "Que se passe-t-il en cas de mauvais temps ?",
                answer: "Les services intérieurs peuvent être réalisés par tous temps. Pour les services extérieurs, nous reportons gracieusement l'intervention en cas de conditions météo défavorables."
              },
              {
                question: "Proposez-vous des services pour les entreprises ?",
                answer: "Oui ! Nous avons des offres spéciales pour les flottes VTC, véhicules d'entreprise et professionnels. Contactez-nous au 01 23 45 67 89 pour un devis personnalisé."
              }
            ].map((faq, index) => (
              <Card key={index} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                <CardContent className="p-6">
                  <h3 className="text-white font-semibold text-lg mb-3">{faq.question}</h3>
                  <p className="text-white/70 leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-white/70 mb-4">Vous ne trouvez pas la réponse à votre question ?</p>
            <Button 
              asChild
              className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-medium px-8 py-3 rounded-full"
            >
              <a href="tel:+33123456789">Contactez-nous directement</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}