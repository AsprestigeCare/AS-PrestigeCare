// Google Analytics 4 implementation
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID!, {
      page_path: url,
    })
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Custom events for AS Prestige Care
export const trackBookingStart = () => {
  event({
    action: 'booking_started',
    category: 'engagement',
    label: 'booking_form'
  })
}

export const trackBookingStep = (step: number, stepName: string) => {
  event({
    action: 'booking_step',
    category: 'booking_flow',
    label: `step_${step}_${stepName}`,
    value: step
  })
}

export const trackBookingComplete = (serviceType: string, totalAmount: number) => {
  event({
    action: 'booking_completed',
    category: 'conversion',
    label: serviceType,
    value: totalAmount
  })
}

export const trackSubscriptionStart = (planId: string) => {
  event({
    action: 'subscription_started',
    category: 'engagement',
    label: planId
  })
}

export const trackSubscriptionComplete = (planId: string, monthlyAmount: number) => {
  event({
    action: 'subscription_completed',
    category: 'conversion',
    label: planId,
    value: monthlyAmount
  })
}

export const trackContactForm = (source: string) => {
  event({
    action: 'contact_form_submit',
    category: 'engagement',
    label: source
  })
}

export const trackPhoneCall = () => {
  event({
    action: 'phone_call_click',
    category: 'engagement',
    label: 'header_cta'
  })
}

export const trackWhatsAppClick = () => {
  event({
    action: 'whatsapp_click',
    category: 'engagement',
    label: 'contact_button'
  })
}

// Enhanced ecommerce for Stripe integration
export const trackPurchase = (transactionId: string, items: Array<{
  item_id: string
  item_name: string
  category: string
  quantity: number
  price: number
}>, value: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: transactionId,
      value: value,
      currency: 'EUR',
      items: items
    })
  }
}

// Declare gtag function
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: any
    ) => void
  }
}