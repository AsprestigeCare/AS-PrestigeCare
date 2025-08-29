"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Accueil', href: '/' },
  { name: 'Réserver', href: '/reserver' },
  { name: 'Abonnements', href: '/abonnements' },
  { name: 'Rituel', href: '/rituel' },
  { name: 'Galerie', href: '/galerie' },
  { name: 'Entreprises', href: '/entreprises' },
  { name: 'Contact', href: '/contact' },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-[#0F0F0F]/95 backdrop-blur-md border-b border-white/10">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="border border-[#D4AF37] rounded-sm p-2 w-12 h-12 flex items-center justify-center">
              <span className="text-[#D4AF37] font-serif text-lg font-light tracking-wider">AS</span>
            </div>
            <div className="ml-3 hidden sm:block">
              <div className="text-white font-light text-lg tracking-wide">AS Prestige Care</div>
              <div className="text-[#D4AF37] text-xs tracking-wide uppercase">Mobile Car Detailing</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-white/80 hover:text-[#D4AF37] transition-colors duration-200 text-sm font-medium",
                  pathname === item.href && "text-[#D4AF37]"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="tel:+33123456789"
              className="text-white/80 hover:text-[#D4AF37] transition-colors"
            >
              <Phone size={18} />
            </a>
            <Button 
              asChild 
              className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-medium px-6 py-2 rounded-full transition-all duration-200 hover:scale-105"
            >
              <Link href="/reserver">Réserver</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-[#D4AF37]"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-[#0F0F0F] border-t border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block px-3 py-2 text-white/80 hover:text-[#D4AF37] transition-colors",
                  pathname === item.href && "text-[#D4AF37]"
                )}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 pb-2 px-3">
              <Button 
                asChild 
                className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-black font-medium rounded-full"
              >
                <Link href="/reserver" onClick={() => setIsOpen(false)}>
                  Réserver
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}