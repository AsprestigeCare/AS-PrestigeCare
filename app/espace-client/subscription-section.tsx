'use client'

import { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { openPortal, cancelAtPeriodEnd } from '../actions/subscription'

export default function SubscriptionSection({ subscription }: { subscription: any }) {
  const [pending, startTransition] = useTransition()

  const manage = () => {
    startTransition(async () => {
      const res = await openPortal()
      if (res.url) {
        window.location.href = res.url
      }
    })
  }

  const cancel = () => {
    startTransition(async () => {
      await cancelAtPeriodEnd()
    })
  }

  return (
    <div className="space-y-4">
      <p>Plan: {subscription.plan}</p>
      <p>Statut: {subscription.status}</p>
      <p>Renouvellement: {new Date(subscription.currentPeriodEnd).toLocaleDateString('fr-FR')}</p>
      <Button onClick={manage} disabled={pending}>Gérer dans Stripe</Button>
      <Button onClick={cancel} variant="destructive" disabled={pending}>
        Résilier fin de période
      </Button>
    </div>
  )
}
