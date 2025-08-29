import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import Stripe from 'stripe'

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        
        if (session.mode === 'payment') {
          // Handle booking deposit payment
          await handleBookingDepositPayment(session)
        } else if (session.mode === 'subscription') {
          // Handle subscription creation
          await handleSubscriptionCreated(session)
        }
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionUpdated(subscription)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionCancelled(subscription)
        break
      }

      case 'invoice.paid': {
        const invoice = event.data.object as Stripe.Invoice
        if (invoice.subscription) {
          await handleInvoicePaid(invoice)
        }
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        if (invoice.subscription) {
          await handlePaymentFailed(invoice)
        }
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}

async function handleBookingDepositPayment(session: Stripe.Checkout.Session) {
  const bookingId = session.metadata?.booking_id

  if (!bookingId) {
    console.error('No booking_id in session metadata')
    return
  }

  // Update booking as confirmed
  await prisma.booking.update({
    where: { id: bookingId },
    data: {
      status: 'CONFIRMED',
      depositPaid: true,
      stripeDepositId: session.payment_intent as string,
    }
  })

  // TODO: Send confirmation email with ICS attachment
  console.log(`Booking ${bookingId} confirmed with deposit payment`)
}

async function handleSubscriptionCreated(session: Stripe.Checkout.Session) {
  const planId = session.metadata?.plan_id
  const customerId = session.metadata?.customer_id

  if (!planId || !session.subscription) {
    console.error('Missing plan_id or subscription in session')
    return
  }

  // Get subscription details
  const subscription = await stripe.subscriptions.retrieve(session.subscription as string)

  // Create or update subscription in database
  let customer
  if (customerId) {
    customer = await prisma.customer.findUnique({ where: { id: customerId } })
  }

  if (!customer && session.customer_email) {
    customer = await prisma.customer.upsert({
      where: { email: session.customer_email },
      create: {
        email: session.customer_email,
        name: session.customer_details?.name || '',
        phone: '',
      },
      update: {}
    })
  }

  if (customer) {
    await prisma.subscription.create({
      data: {
        customerId: customer.id,
        stripeSubId: subscription.id,
        plan: planId.toUpperCase().replace('-', '_') as any,
        status: 'ACTIVE',
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      }
    })

    // Attach Stripe customer id if missing
    if (!customer.stripeCustomerId && typeof session.customer === 'string') {
      await prisma.customer.update({
        where: { id: customer.id },
        data: { stripeCustomerId: session.customer as string },
      })
    }
  }

  console.log(`Subscription created for customer ${customer?.email}`)
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const newStatus = subscription.pause_collection
    ? 'PAUSED'
    : subscription.status === 'canceled'
      ? 'CANCELED'
      : 'ACTIVE'

  await prisma.subscription.updateMany({
    where: { stripeSubId: subscription.id },
    data: {
      status: newStatus as any,
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    },
  })

  // ensure stripeCustomerId is stored
  if (typeof subscription.customer === 'string') {
    await prisma.customer.updateMany({
      where: {
        stripeCustomerId: null,
        subscriptions: {
          some: { stripeSubId: subscription.id },
        },
      },
      data: { stripeCustomerId: subscription.customer },
    })
  }
}

async function handleSubscriptionCancelled(subscription: Stripe.Subscription) {
  await prisma.subscription.updateMany({
    where: { stripeSubId: subscription.id },
    data: { status: 'CANCELED' },
  })
}

async function handleInvoicePaid(invoice: Stripe.Invoice) {
  // Keep subscription active
  if (invoice.subscription) {
    await prisma.subscription.updateMany({
      where: { stripeSubId: invoice.subscription as string },
      data: { status: 'ACTIVE' },
    })
  }
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  // Mark subscription as past due
  if (invoice.subscription) {
    await prisma.subscription.updateMany({
      where: { stripeSubId: invoice.subscription as string },
      data: { status: 'PAUSED' },
    })
  }
}