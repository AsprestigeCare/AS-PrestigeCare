"use client"

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AlertTriangle, RefreshCw, Home, Phone } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle size={40} className="text-red-400" />
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-4">
            Oups ! Une erreur s'est produite
          </h1>
          
          <p className="text-white/70 text-lg">
            Nous rencontrons un problème technique temporaire. 
            Notre équipe a été automatiquement informée.
          </p>
        </div>

        {/* Error Details */}
        <Card className="bg-white/5 border-white/10 mb-8">
          <CardContent className="p-6">
            <h3 className="text-white font-semibold mb-3">Que puis-je faire ?</h3>
            <div className="space-y-2 text-white/70 text-sm text-left">
              <p>• Rafraîchir la page pour réessayer</p>
              <p>• Vérifier votre connexion internet</p>
              <p>• Réessayer dans quelques minutes</p>
              <p>• Contacter notre support si le problème persiste</p>
            </div>
            
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-4 p-3 bg-red-500/10 rounded border border-red-500/20">
                <summary className="text-red-400 cursor-pointer text-sm">
                  Détails de l'erreur (dev)
                </summary>
                <pre className="mt-2 text-xs text-red-300 overflow-x-auto">
                  {error.message}
                  {error.digest && `\nDigest: ${error.digest}`}
                </pre>
              </details>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <Button 
            onClick={reset}
            className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-medium py-3"
          >
            <RefreshCw size={18} className="mr-2" />
            Réessayer
          </Button>
          
          <Button 
            asChild 
            variant="outline"
            className="border-white/20 text-white hover:bg-white/5 py-3"
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
            <Link href="/contact">
              <Phone size={18} className="mr-2" />
              Support
            </Link>
          </Button>
        </div>

        {/* Contact Support */}
        <div className="p-6 bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-lg">
          <h3 className="text-white font-semibold mb-2">Problème persistant ?</h3>
          <p className="text-white/70 text-sm mb-4">
            Contactez notre équipe technique pour une assistance immédiate
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
              href="mailto:support@asprestigecare.fr"
              className="inline-flex items-center text-[#D4AF37] hover:text-[#B8941F] transition-colors"
            >
              support@asprestigecare.fr
            </a>
          </div>
        </div>

        {/* Status Page Link */}
        <p className="text-white/50 text-sm mt-6">
          Vérifiez le statut de nos services sur{' '}
          <a 
            href="https://status.asprestigecare.fr" 
            className="text-[#D4AF37] hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            status.asprestigecare.fr
          </a>
        </p>
      </div>
    </div>
  )
}