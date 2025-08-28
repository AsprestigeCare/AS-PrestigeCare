import Link from 'next/link'
import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-[#0F0F0F] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center mb-4">
              <div className="border border-[#D4AF37] rounded-sm p-2 w-12 h-12 flex items-center justify-center">
                <span className="text-[#D4AF37] font-serif text-lg font-light tracking-wider">AS</span>
              </div>
              <div className="ml-3">
                <div className="text-white font-light text-lg tracking-wide">AS Prestige Care</div>
                <div className="text-[#D4AF37] text-xs tracking-wide uppercase">Mobile Car Detailing</div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Service de nettoyage automobile premium à domicile. 
              Respectueux de l'environnement avec moins de 30L d'eau par véhicule.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-medium text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link href="/reserver" className="text-white/60 hover:text-[#D4AF37] transition-colors text-sm">Intérieur Premium</Link></li>
              <li><Link href="/reserver" className="text-white/60 hover:text-[#D4AF37] transition-colors text-sm">Extérieur + Intérieur</Link></li>
              <li><Link href="/reserver" className="text-white/60 hover:text-[#D4AF37] transition-colors text-sm">Soft Polish + Sealant</Link></li>
              <li><Link href="/entreprises" className="text-white/60 hover:text-[#D4AF37] transition-colors text-sm">Flottes VTC</Link></li>
              <li><Link href="/abonnements" className="text-white/60 hover:text-[#D4AF37] transition-colors text-sm">Abonnements</Link></li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-white font-medium text-lg mb-4">Information</h3>
            <ul className="space-y-2">
              <li><Link href="/rituel" className="text-white/60 hover:text-[#D4AF37] transition-colors text-sm">Notre Rituel</Link></li>
              <li><Link href="/galerie" className="text-white/60 hover:text-[#D4AF37] transition-colors text-sm">Galerie</Link></li>
              <li><Link href="/cgv" className="text-white/60 hover:text-[#D4AF37] transition-colors text-sm">CGV</Link></li>
              <li><Link href="/mentions-legales" className="text-white/60 hover:text-[#D4AF37] transition-colors text-sm">Mentions légales</Link></li>
              <li><Link href="/confidentialite" className="text-white/60 hover:text-[#D4AF37] transition-colors text-sm">Confidentialité</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-medium text-lg mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-[#D4AF37]" />
                <a href="tel:+33123456789" className="text-white/60 hover:text-[#D4AF37] transition-colors text-sm">
                  01 23 45 67 89
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-[#D4AF37]" />
                <a href="mailto:contact@asprestigecare.fr" className="text-white/60 hover:text-[#D4AF37] transition-colors text-sm">
                  contact@asprestigecare.fr
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-[#D4AF37]" />
                <span className="text-white/60 text-sm">Île-de-France</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-white/60 hover:text-[#D4AF37] transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white/60 hover:text-[#D4AF37] transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} AS Prestige Care. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}