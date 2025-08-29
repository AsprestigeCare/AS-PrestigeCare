import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Home, Phone, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Animation */}
        <div className="mb-8">
          <div className="text-8xl font-bold text-[#D4AF37] mb-4 animate-pulse">
            404
          </div>
          <div className="text-2xl text-white font-light mb-2">
            Page introuvable
          </div>
          <p className="text-white/70 text-lg">
            Désolé, nous n'avons pas pu trouver la page que vous cherchez.
          </p>
        </div>

        {/* Error Details */}
        <Card className="bg-white/5 border-white/10 mb-8 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="space-y-4">
              <div className="text-white/80">
                <p className="mb-4">Quelques suggestions pour retrouver votre chemin :</p>
                <ul className="text-left space-y-2 text-white/70">
                  <li>• Vérifiez l'URL dans la barre d'adresse</li>
                  <li>• Utilisez la navigation principale du site</li>
                  <li>• Retournez à la page d'accueil</li>
                  <li>• Contactez-nous si vous pensez qu'il s'agit d'une erreur</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid sm:grid-cols-3 gap-4">
          <Button 
            asChild 
            className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-medium py-3"
          >
            <Link href="/">
              <Home size={18} className="mr-2" />
              Accueil
            </Link>
          </Button>
          
          <Button 
            asChild 
            variant="outline"
            className="border-white/20 text-white hover:bg-white/5 py-3"
          >
            <Link href="/reserver">
              <Search size={18} className="mr-2" />
              Réserver
            </Link>
          </Button>
          
          <Button 
            asChild 
            variant="outline"
            className="border-white/20 text-white hover:bg-white/5 py-3"
          >
            <Link href="/contact">
              <Phone size={18} className="mr-2" />
              Contact
            </Link>
          </Button>
        </div>

        {/* Additional Help */}
        <div className="mt-12 p-6 bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-lg">
          <h3 className="text-white font-semibold mb-2">Besoin d'aide immédiate ?</h3>
          <p className="text-white/70 text-sm mb-4">
            Notre équipe est disponible pour vous accompagner
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a 
              href="tel:+33123456789"
              className="inline-flex items-center text-[#D4AF37] hover:text-[#B8941F] transition-colors"
            >
              <Phone size={16} className="mr-2" />
              01 23 45 67 89
            </a>
            <a 
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, '')}`}
              className="inline-flex items-center text-[#D4AF37] hover:text-[#B8941F] transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-white/50 text-sm mt-8">
          Si cette erreur persiste, veuillez nous contacter à{' '}
          <a 
            href="mailto:support@asprestigecare.fr" 
            className="text-[#D4AF37] hover:underline"
          >
            support@asprestigecare.fr
          </a>
        </p>
      </div>
    </div>
  )
}