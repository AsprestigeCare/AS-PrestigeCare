import './globals.css'
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ToastProvider } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair'
})

export const metadata: Metadata = {
  title: 'AS Prestige Care - Nettoyage Automobile Premium à Domicile',
  description: 'Service de nettoyage automobile premium à domicile en Île-de-France. Respectueux de l\'environnement, produits biodégradables, moins de 30L d\'eau par véhicule.',
  keywords: 'nettoyage auto, détailing, domicile, premium, écologique, Paris, Île-de-France',
  openGraph: {
    title: 'AS Prestige Care - Car Detailing Premium',
    description: 'Service de nettoyage automobile premium à domicile en Île-de-France',
    type: 'website',
    locale: 'fr_FR',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={cn(inter.variable, playfair.variable)}>
      <body className="min-h-screen bg-[#0F0F0F] text-white font-inter antialiased">
        <ToastProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ToastProvider>
      </body>
    </html>
  )
}