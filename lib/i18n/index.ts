export type Locale = 'fr' | 'en'

export const defaultLocale: Locale = 'fr'
export const locales: Locale[] = ['fr', 'en']

import fr from './locales/fr.json'
import en from './locales/en.json'

const messages = { fr, en }

export function getMessages(locale: Locale = defaultLocale) {
  return messages[locale] || messages[defaultLocale]
}

export function t(key: string, locale: Locale = defaultLocale): string {
  const messages = getMessages(locale)
  
  // Support nested keys like "common.save"
  const keys = key.split('.')
  let value: any = messages
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k]
    } else {
      return key // Return key if translation not found
    }
  }
  
  return typeof value === 'string' ? value : key
}

// React hook for translations
import { useRouter } from 'next/navigation'

export function useTranslations() {
  const router = useRouter()
  // In a real app, you'd get locale from URL or context
  const locale: Locale = 'fr' // For now, default to French
  
  return {
    t: (key: string) => t(key, locale),
    locale,
    setLocale: (newLocale: Locale) => {
      // In real app, update URL and context
      router.push(`/${newLocale}`)
    }
  }
}