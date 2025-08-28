import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'
import { validateBookingRules, calculateTotalPrice, getZoneFromPostalCode, DEPOSIT_AMOUNT } from '@/lib/business-logic'
import { BookingFormData } from '@/lib/business-logic'

export async function POST(req: NextRequest) {
  try {
    const bookingData: BookingFormData = await req.json()

    // Validate business rules
    const validation = validateBookingRules(bookingData)
    if (!validation.isValid) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.errors },
        { status: 400 }
      )
    }

    // Calculate total price
    const totalPrice = calculateTotalPrice(bookingData)
    const zone = getZoneFromPostalCode(bookingData.postalCode)

    // Create or find customer
    let customer = await prisma.customer.findUnique({
      where: { email: bookingData.customerEmail }
    })

    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          name: bookingData.customerName,
          email: bookingData.customerEmail,
          phone: bookingData.customerPhone,
        }
      })
    }

    // Find or create service
    let service = await prisma.service.findFirst({
      where: { 
        name: bookingData.serviceType,
        isActive: true 
      }
    })

    if (!service) {
      // Create service if it doesn't exist (for demo purposes)
      const serviceMap = {
        'INTERIEUR_PREMIUM': { name: 'Intérieur Premium', price: 100, type: 'INTERIEUR', durationMin: 90 },
        'EXTERIEUR_INTERIEUR_COMPLET': { name: 'Extérieur + Intérieur Complet', price: 220, type: 'EXTERIEUR', durationMin: 180 },
        'SOFT_POLISH_SEALANT': { name: 'Soft Polish + Sealant', price: 240, type: 'POLISH', durationMin: 240 },
        'VTC_ZEN_45': { name: 'VTC Zen 45min', price: 35, type: 'INTERIEUR', durationMin: 45 },
      }

      const serviceInfo = serviceMap[bookingData.serviceType as keyof typeof serviceMap]
      if (!serviceInfo) {
        return NextResponse.json({ error: 'Service not found' }, { status: 400 })
      }

      service = await prisma.service.create({
        data: {
          name: serviceInfo.name,
          price: serviceInfo.price,
          type: serviceInfo.type as any,
          durationMin: serviceInfo.durationMin,
          isActive: true
        }
      })
    }

    // Create booking (pending until payment confirmation)
    const booking = await prisma.booking.create({
      data: {
        customerId: customer.id,
        serviceId: service.id,
        date: new Date(bookingData.date + 'T' + bookingData.timeSlot + ':00'),
        startTime: bookingData.timeSlot,
        duration: service.durationMin,
        address: bookingData.address,
        postalCode: bookingData.postalCode,
        city: bookingData.city,
        zone: zone,
        gearbox: bookingData.gearbox as any,
        placeType: bookingData.placeType as any,
        convoyageKmBand: bookingData.convoyageDistance as any,
        convoyagePrice: bookingData.convoyageDistance ? 
          (bookingData.convoyageDistance === '0_10' ? 29 : 39) : 0,
        totalPrice: totalPrice,
        remainingAmount: totalPrice - DEPOSIT_AMOUNT,
        depositPaid: false,
        status: 'PENDING',
        notes: bookingData.notes || null
      }
    })

    // Create Stripe checkout session for deposit
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Dépôt de garantie - AS Prestige Care',
              description: `Réservation: ${service.name} le ${new Date(bookingData.date).toLocaleDateString('fr-FR')} à ${bookingData.timeSlot}`,
            },
            unit_amount: DEPOSIT_AMOUNT * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.nextUrl.origin}/booking-success?booking_id=${booking.id}`,
      cancel_url: `${req.nextUrl.origin}/reserver`,
      metadata: {
        booking_id: booking.id,
        customer_id: customer.id,
      },
      customer_email: customer.email,
    })

    // Update booking with stripe session ID
    await prisma.booking.update({
      where: { id: booking.id },
      data: { stripeDepositId: session.id }
    })

    return NextResponse.json({
      success: true,
      sessionUrl: session.url,
      bookingId: booking.id
    })

  } catch (error) {
    console.error('Booking API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}