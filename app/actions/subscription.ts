'use server'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'

export async function openPortal() {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    throw new Error('Non authentifié')
  }

  const customer = await prisma.customer.findFirst({ where: { userId: session.user.id } })
  if (!customer?.stripeCustomerId) {
    throw new Error('Client Stripe introuvable')
  }

  const portal = await stripe.billingPortal.sessions.create({
    customer: customer.stripeCustomerId,
    return_url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/espace-client`,
  })

  return { url: portal.url }
}

export async function cancelAtPeriodEnd() {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    throw new Error('Non authentifié')
  }

  const subscription = await prisma.subscription.findFirst({
    where: { customer: { userId: session.user.id }, status: 'ACTIVE' },
  })
  if (!subscription) {
    throw new Error('Aucun abonnement actif')
  }

  await stripe.subscriptions.update(subscription.stripeSubId, {
    cancel_at_period_end: true,
  })

  // DB will be updated via webhook
  return { success: true }
}
