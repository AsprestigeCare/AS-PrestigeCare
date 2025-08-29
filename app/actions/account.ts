'use server'

import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { differenceInHours } from 'date-fns'
import { ZONE_SCHEDULE, getZoneFromPostalCode, isExterior } from '@/lib/business-logic'

const profileSchema = z.object({
  name: z.string().min(1).optional(),
  phone: z.string().optional(),
  defaultAddress: z.string().optional(),
})

export async function updateProfile(data: {
  name?: string
  phone?: string
  defaultAddress?: string
}) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    throw new Error('Non authentifié')
  }

  const parsed = profileSchema.parse(data)

  await prisma.customer.updateMany({
    where: { userId: session.user.id },
    data: parsed,
  })
  return { success: true }
}

const rescheduleSchema = z.object({
  bookingId: z.string(),
  newDate: z.string(),
  newTime: z.string(),
})

export async function requestReschedule(input: {
  bookingId: string
  newDate: string
  newTime: string
}) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    throw new Error('Non authentifié')
  }

  const { bookingId, newDate, newTime } = rescheduleSchema.parse(input)
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { service: true, customer: true },
  })
  if (!booking || booking.customer.userId !== session.user.id) {
    throw new Error('Accès refusé')
  }

  if (booking.rescheduleCount >= booking.rescheduleLimit) {
    throw new Error('Replanification déjà utilisée')
  }

  if (differenceInHours(booking.date, new Date()) < 24) {
    throw new Error('Trop tard pour replanifier')
  }

  const newDateTime = new Date(`${newDate}T${newTime}:00`)
  const zone = getZoneFromPostalCode(booking.postalCode)

  if (booking.service && isExterior(booking.service.name.toLowerCase())) {
    if (booking.placeType === 'PUBLIC') {
      throw new Error('Ce service nécessite un lieu privé ou micro-hub')
    }
    if (zone) {
      const allowed = ZONE_SCHEDULE[zone]
      if (!allowed.includes(newDateTime.getDay())) {
        throw new Error('Jour non disponible pour votre zone')
      }
    }
  }

  if (booking.gearbox === 'BVM' && booking.convoyageKmBand) {
    throw new Error('Convoyage indisponible pour boîte manuelle')
  }

  await prisma.booking.update({
    where: { id: bookingId },
    data: {
      date: newDateTime,
      startTime: newTime,
      zone: zone,
      rescheduleCount: { increment: 1 },
    },
  })

  return { success: true }
}
