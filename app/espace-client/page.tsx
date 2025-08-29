import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import ProfileForm from './profile-form'
import SubscriptionSection from './subscription-section'

export default async function EspaceClientPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    redirect('/auth/signin')
  }

  const customer = await prisma.customer.findFirst({
    where: { userId: session.user.id },
    include: {
      bookings: {
        orderBy: { date: 'asc' },
      },
      subscriptions: true,
    },
  })

  return (
    <div className="max-w-5xl mx-auto py-8 text-white">
      <Tabs defaultValue="dashboard">
        <TabsList className="mb-4">
          <TabsTrigger value="dashboard">Tableau de bord</TabsTrigger>
          <TabsTrigger value="bookings">Mes réservations</TabsTrigger>
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="subscription">Abonnement</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <h2 className="text-2xl mb-4">Bienvenue {customer?.name}</h2>
          <p>Vous avez {customer?.bookings.length || 0} réservation(s).</p>
        </TabsContent>

        <TabsContent value="bookings">
          {customer?.bookings.map((b) => (
            <div key={b.id} className="border-b border-white/10 py-2">
              <p>{b.serviceId} - {new Date(b.date).toLocaleString('fr-FR')}</p>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="profile">
          <ProfileForm customer={customer} />
        </TabsContent>

        <TabsContent value="subscription">
          {customer?.subscriptions[0] ? (
            <SubscriptionSection subscription={customer.subscriptions[0]} />
          ) : (
            <p>Aucun abonnement actif.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
