import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { stripe, SUBSCRIPTION_PLANS } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  try {
    const { planId, customerEmail, customerName } = await req.json()

    if (!planId || !SUBSCRIPTION_PLANS[planId as keyof typeof SUBSCRIPTION_PLANS]) {
      return NextResponse.json({ error: 'Invalid plan ID' }, { status: 400 })
    }

    const plan = SUBSCRIPTION_PLANS[planId as keyof typeof SUBSCRIPTION_PLANS]

    // Create or find customer
    let customer = await prisma.customer.findUnique({
      where: { email: customerEmail }
    })

    if (!customer && customerEmail && customerName) {
      customer = await prisma.customer.create({
        data: {
          name: customerName,
          email: customerEmail,
          phone: '', // Will be filled in later
        }
      })
    }

    // Create Stripe product and price if they don't exist
    let stripePrice: string

    try {
      const prices = await stripe.prices.list({
        lookup_keys: [planId],
        expand: ['data.product'],
      })

      if (prices.data.length > 0) {
        stripePrice = prices.data[0].id
      } else {
        // Create product and price
        const product = await stripe.products.create({
          name: plan.name,
          description: plan.description,
        })

        const price = await stripe.prices.create({
          unit_amount: plan.price,
          currency: 'eur',
          recurring: { interval: plan.interval },
          product: product.id,
          lookup_key: planId,
        })

        stripePrice = price.id
      }
    } catch (error) {
      console.error('Error creating Stripe product/price:', error)
      return NextResponse.json({ error: 'Failed to create subscription' }, { status: 500 })
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: stripePrice,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${req.nextUrl.origin}/subscription-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/abonnements`,
      metadata: {
        plan_id: planId,
        customer_id: customer?.id || '',
      },
      customer_email: customerEmail,
      allow_promotion_codes: true,
    })

    return NextResponse.json({
      success: true,
      sessionUrl: session.url,
    })

  } catch (error) {
    console.error('Subscription API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}