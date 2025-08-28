export interface BookingFormData {
  customerName: string
  customerEmail: string
  customerPhone: string
  address: string
  postalCode: string
  city: string
  vehicleType: string
  gearbox: 'BVA' | 'BVM'
  placeType: 'PRIVE' | 'PUBLIC' | 'HUB'
  serviceType: string
  convoyageDistance?: '0_10' | '11_20'
  date: string
  timeSlot: string
  notes?: string
}

// Zone mapping based on postal codes
export const ZONE_MAPPING: Record<string, number> = {
  '93': 1, // Monday
  '92': 2, // Thursday  
  '91': 3, // Friday
  '77': 4, // Wednesday
}

// Zone schedule (which days exterior services are available)
export const ZONE_SCHEDULE: Record<number, number[]> = {
  1: [1], // Zone 1 (93) - Monday only
  2: [4], // Zone 2 (92) - Thursday only  
  3: [5], // Zone 3 (91) - Friday only
  4: [3], // Zone 4 (77) - Wednesday only
}

export const CONVOYAGE_PRICES = {
  '0_10': 29, // ≤10 km
  '11_20': 39, // 11-20 km
}

export const SERVICE_PRICES = {
  INTERIEUR_PREMIUM: 100,
  EXTERIEUR_INTERIEUR_COMPLET: 220,
  SOFT_POLISH_SEALANT: 240,
  VTC_ZEN_45: 35,
  CANAPE_3_PLACES: 100,
}

export function validateBookingRules(data: BookingFormData): {
  isValid: boolean
  errors: string[]
  suggestions: string[]
} {
  const errors: string[] = []
  const suggestions: string[] = []

  // Rule 1: Public location restrictions
  if (data.placeType === 'PUBLIC') {
    if (data.serviceType !== 'INTERIEUR_PREMIUM') {
      errors.push('Les services extérieurs ne sont pas disponibles sur voie publique')
      suggestions.push('Nous vous proposons le service "Intérieur Premium" uniquement')
    }
  }

  // Rule 2: Exterior services require private or hub location
  if (['EXTERIEUR_INTERIEUR_COMPLET', 'SOFT_POLISH_SEALANT'].includes(data.serviceType)) {
    if (data.placeType === 'PUBLIC') {
      errors.push('Ce service nécessite un emplacement privé ou notre micro-hub')
      suggestions.push('Veuillez sélectionner "Emplacement privé" ou "Micro-hub AS"')
    }
  }

  // Rule 3: Convoyage only for automatic transmission
  if (data.gearbox === 'BVM' && data.convoyageDistance) {
    errors.push('Le service de convoyage n\'est disponible que pour les boîtes automatiques (BVA)')
    suggestions.push('Veuillez modifier le type de boîte ou retirer le convoyage')
  }

  // Rule 4: Zone-based scheduling for exterior services
  if (['EXTERIEUR_INTERIEUR_COMPLET', 'SOFT_POLISH_SEALANT'].includes(data.serviceType)) {
    const zone = getZoneFromPostalCode(data.postalCode)
    if (zone) {
      const allowedDays = ZONE_SCHEDULE[zone]
      const selectedDate = new Date(data.date)
      const dayOfWeek = selectedDate.getDay() // 0 = Sunday, 1 = Monday, etc.
      
      if (!allowedDays.includes(dayOfWeek)) {
        const dayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
        const allowedDayNames = allowedDays.map(day => dayNames[day]).join(', ')
        errors.push(`Les services extérieurs ne sont disponibles que le ${allowedDayNames} dans votre zone`)
        suggestions.push('Veuillez choisir une autre date ou optez pour un service intérieur uniquement')
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    suggestions
  }
}

export function getZoneFromPostalCode(postalCode: string): number | null {
  const prefix = postalCode.substring(0, 2)
  return ZONE_MAPPING[prefix] || null
}

export function calculateTotalPrice(data: BookingFormData): number {
  let basePrice = 0

  switch (data.serviceType) {
    case 'INTERIEUR_PREMIUM':
      basePrice = SERVICE_PRICES.INTERIEUR_PREMIUM
      break
    case 'EXTERIEUR_INTERIEUR_COMPLET':
      basePrice = SERVICE_PRICES.EXTERIEUR_INTERIEUR_COMPLET
      break
    case 'SOFT_POLISH_SEALANT':
      basePrice = SERVICE_PRICES.SOFT_POLISH_SEALANT
      break
    case 'VTC_ZEN_45':
      basePrice = SERVICE_PRICES.VTC_ZEN_45
      break
    case 'CANAPE_3_PLACES':
      basePrice = SERVICE_PRICES.CANAPE_3_PLACES
      break
  }

  // Add convoyage price if applicable
  if (data.convoyageDistance && data.gearbox === 'BVA') {
    basePrice += CONVOYAGE_PRICES[data.convoyageDistance]
  }

  return basePrice
}

export const DEPOSIT_AMOUNT = 20 // €20 deposit