import type { Metadata } from 'next'

interface SEOConfig {
  title?: string
  description?: string
  keywords?: string[]
  ogImage?: string
  noIndex?: boolean
  canonical?: string
  structuredData?: object
}

export function generateSEO({
  title,
  description,
  keywords = [],
  ogImage,
  noIndex = false,
  canonical,
  structuredData
}: SEOConfig = {}): Metadata {
  const defaultTitle = "AS Prestige Care - Nettoyage Automobile Premium à Domicile"
  const defaultDescription = "Service de nettoyage automobile premium à domicile en Île-de-France. Écologique, moins de 30L d'eau, produits biodégradables. Réservation en ligne."
  
  const fullTitle = title ? `${title} | AS Prestige Care` : defaultTitle
  const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://asprestigecare.fr'
  
  return {
    title: fullTitle,
    description: description || defaultDescription,
    keywords: [
      'nettoyage auto',
      'car detailing',
      'lavage domicile',
      'nettoyage automobile',
      'Paris',
      'Île-de-France',
      'écologique',
      'premium',
      ...keywords
    ].join(', '),
    authors: [{ name: 'AS Prestige Care' }],
    creator: 'AS Prestige Care',
    publisher: 'AS Prestige Care',
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: canonical || siteUrl,
      languages: {
        'fr-FR': siteUrl,
        'en-US': `${siteUrl}/en`
      }
    },
    openGraph: {
      title: fullTitle,
      description: description || defaultDescription,
      url: canonical || siteUrl,
      siteName: 'AS Prestige Care',
      locale: 'fr_FR',
      type: 'website',
      images: [
        {
          url: ogImage || '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'AS Prestige Care - Nettoyage Automobile Premium'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: description || defaultDescription,
      creator: '@asprestigecare',
      images: [ogImage || '/og-image.jpg']
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    },
    verification: {
      google: 'your-google-verification-code',
      yandex: 'your-yandex-verification-code'
    },
    other: {
      'application/ld+json': structuredData ? JSON.stringify(structuredData) : undefined
    }
  }
}

// Structured data for local business
export const localBusinessStructuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://asprestigecare.fr",
  "name": "AS Prestige Care",
  "alternateName": "AS Prestige Care - Mobile Car Detailing",
  "description": "Service de nettoyage automobile premium à domicile en Île-de-France",
  "url": "https://asprestigecare.fr",
  "telephone": "+33123456789",
  "priceRange": "€€€",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Avenue de la République",
    "addressLocality": "Boulogne-Billancourt",
    "postalCode": "92100",
    "addressRegion": "Île-de-France",
    "addressCountry": "FR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 48.8566,
    "longitude": 2.3522
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "20:00"
    },
    {
      "@type": "OpeningHoursSpecification", 
      "dayOfWeek": "Saturday",
      "opens": "09:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Sunday", 
      "opens": "10:00",
      "closes": "17:00"
    }
  ],
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 48.8566,
      "longitude": 2.3522
    },
    "geoRadius": "50000"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Services de nettoyage automobile",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Intérieur Premium",
          "description": "Nettoyage complet intérieur avec produits biodégradables"
        },
        "price": "100",
        "priceCurrency": "EUR"
      },
      {
        "@type": "Offer", 
        "itemOffered": {
          "@type": "Service",
          "name": "Extérieur + Intérieur Complet",
          "description": "Service complet intérieur et extérieur avec protection"
        },
        "price": "220",
        "priceCurrency": "EUR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service", 
          "name": "Soft Polish + Sealant",
          "description": "Rénovation et protection longue durée"
        },
        "price": "240",
        "priceCurrency": "EUR"
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "150",
    "bestRating": "5",
    "worstRating": "1"
  },
  "image": [
    "https://asprestigecare.fr/logo.png",
    "https://asprestigecare.fr/service-photo-1.jpg",
    "https://asprestigecare.fr/service-photo-2.jpg"
  ],
  "logo": "https://asprestigecare.fr/logo.png",
  "sameAs": [
    "https://www.facebook.com/asprestigecare",
    "https://www.instagram.com/asprestigecare",
    "https://www.google.com/maps/place/AS+Prestige+Care"
  ]
}

// Service-specific structured data
export const serviceStructuredData = {
  "@context": "https://schema.org", 
  "@type": "Service",
  "serviceType": "Car Detailing",
  "provider": {
    "@type": "LocalBusiness",
    "name": "AS Prestige Care"
  },
  "areaServed": {
    "@type": "State",
    "name": "Île-de-France"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Car Detailing Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Premium Interior Cleaning"
        },
        "price": "100.00",
        "priceCurrency": "EUR"
      }
    ]
  }
}