"use client"

import { useSession, signIn } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Calendar, 
  Users, 
  Euro, 
  TrendingUp, 
  Clock, 
  Star,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  AlertTriangle,
  BarChart3
} from 'lucide-react'

// Mock data - in a real app, this would come from your database
const mockData = {
  stats: {
    todayBookings: 12,
    weekRevenue: 2840,
    monthlyGrowth: 15.3,
    avgRating: 4.9,
    completionRate: 98.5
  },
  recentBookings: [
    {
      id: '1',
      customerName: 'Marie Dubois',
      service: 'Intérieur Premium',
      date: '2024-11-20',
      time: '14:00',
      status: 'CONFIRMED',
      amount: 100,
      location: 'Boulogne-Billancourt'
    },
    {
      id: '2',
      customerName: 'Pierre Martin',
      service: 'Complet',
      date: '2024-11-20',
      time: '16:30',
      status: 'PENDING',
      amount: 220,
      location: 'Saint-Maur-des-Fossés'
    },
    {
      id: '3',
      customerName: 'Sophie Laurent',
      service: 'VTC Zen',
      date: '2024-11-21',
      time: '09:00',
      status: 'IN_PROGRESS',
      amount: 35,
      location: 'Paris 16ème'
    }
  ],
  customers: [
    {
      id: '1',
      name: 'Marie Dubois',
      email: 'marie.dubois@email.fr',
      phone: '06 12 34 56 78',
      totalBookings: 5,
      totalSpent: 450,
      lastBooking: '2024-11-15'
    },
    {
      id: '2',
      name: 'Pierre Martin',
      email: 'pierre.martin@email.fr',
      phone: '06 98 76 54 32',
      totalBookings: 8,
      totalSpent: 1200,
      lastBooking: '2024-11-10'
    }
  ]
}

function AdminDashboard() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
        <div className="text-white">Chargement...</div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
        <Card className="bg-white/5 border-white/10 p-8 text-center max-w-md">
          <CardContent>
            <h1 className="text-white text-2xl font-bold mb-4">Accès Admin</h1>
            <p className="text-white/70 mb-6">
              Connectez-vous pour accéder au tableau de bord administrateur
            </p>
            <Button 
              onClick={() => signIn()}
              className="bg-[#D4AF37] hover:bg-[#B8941F] text-black"
            >
              Se connecter
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Tableau de Bord AS Prestige Care
          </h1>
          <p className="text-white/70">
            Bienvenue {session.user?.email} - Gérez vos réservations et votre activité
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">Aujourd'hui</p>
                  <p className="text-2xl font-bold text-white">{mockData.stats.todayBookings}</p>
                </div>
                <Calendar className="w-8 h-8 text-[#D4AF37]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">CA Semaine</p>
                  <p className="text-2xl font-bold text-white">{mockData.stats.weekRevenue}€</p>
                </div>
                <Euro className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">Croissance</p>
                  <p className="text-2xl font-bold text-white">+{mockData.stats.monthlyGrowth}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">Note Moyenne</p>
                  <p className="text-2xl font-bold text-white">{mockData.stats.avgRating}/5</p>
                </div>
                <Star className="w-8 h-8 text-[#D4AF37]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">Taux Succès</p>
                  <p className="text-2xl font-bold text-white">{mockData.stats.completionRate}%</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="bg-white/5 border-white/10">
            <TabsTrigger value="bookings" className="text-white data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black">
              Réservations
            </TabsTrigger>
            <TabsTrigger value="customers" className="text-white data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black">
              Clients
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-white data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-white data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black">
              Paramètres
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Réservations Récentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.recentBookings.map((booking) => (
                    <div key={booking.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-white font-semibold">{booking.customerName}</h3>
                            <Badge 
                              className={
                                booking.status === 'CONFIRMED' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                                booking.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                                booking.status === 'IN_PROGRESS' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                                'bg-gray-500/20 text-gray-400 border-gray-500/30'
                              }
                            >
                              {booking.status}
                            </Badge>
                          </div>
                          <p className="text-white/70 text-sm">{booking.service}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-white/60">
                            <span className="flex items-center gap-1">
                              <Calendar size={14} />
                              {booking.date} à {booking.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin size={14} />
                              {booking.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Euro size={14} />
                              {booking.amount}€
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="border-white/20 text-white">
                            Voir
                          </Button>
                          <Button size="sm" className="bg-[#D4AF37] text-black">
                            Modifier
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Gestion Clients
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.customers.map((customer) => (
                    <div key={customer.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-white font-semibold mb-1">{customer.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-white/60">
                            <span className="flex items-center gap-1">
                              <Mail size={14} />
                              {customer.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone size={14} />
                              {customer.phone}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-sm">
                            <Badge variant="outline" className="border-[#D4AF37]/30 text-[#D4AF37]">
                              {customer.totalBookings} réservations
                            </Badge>
                            <Badge variant="outline" className="border-green-500/30 text-green-400">
                              {customer.totalSpent}€ dépensés
                            </Badge>
                            <span className="text-white/60">
                              Dernière visite: {customer.lastBooking}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="border-white/20 text-white">
                            Historique
                          </Button>
                          <Button size="sm" className="bg-[#D4AF37] text-black">
                            Contacter
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Évolution du CA
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <p className="text-white/60">Graphique des revenus</p>
                    <p className="text-white/40 text-sm mt-2">Intégration Chart.js à implémenter</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Services Populaires</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'Intérieur Premium', count: 45, percentage: 35 },
                      { name: 'Complet', count: 32, percentage: 25 },
                      { name: 'VTC Zen', count: 28, percentage: 22 },
                      { name: 'Polish & Sealant', count: 23, percentage: 18 }
                    ].map((service, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-white">{service.name}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-white/10 rounded-full h-2">
                            <div 
                              className="bg-[#D4AF37] h-2 rounded-full" 
                              style={{ width: `${service.percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-white/70 text-sm w-8">{service.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Paramètres Généraux</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-white block mb-2">Dépôt de garantie</label>
                      <div className="flex items-center gap-2">
                        <span className="text-white">20€</span>
                        <Button size="sm" variant="outline" className="border-white/20 text-white">
                          Modifier
                        </Button>
                      </div>
                    </div>
                    <div>
                      <label className="text-white block mb-2">Zones d'intervention</label>
                      <div className="space-y-2">
                        {['Zone 1 (93)', 'Zone 2 (92)', 'Zone 3 (91)', 'Zone 4 (77)'].map((zone) => (
                          <div key={zone} className="flex items-center gap-2">
                            <CheckCircle size={16} className="text-green-500" />
                            <span className="text-white/70">{zone}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Créneaux Horaires</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-white block mb-2">Horaires standards</label>
                      <p className="text-white/70 text-sm">9h00 - 17h00 (modifiable par zone)</p>
                    </div>
                    <div>
                      <label className="text-white block mb-2">Durée moyenne intervention</label>
                      <p className="text-white/70 text-sm">90 minutes (Intérieur Premium)</p>
                    </div>
                    <Button className="bg-[#D4AF37] text-black">
                      Gérer les Créneaux
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default function AdminPage() {
  return <AdminDashboard />
}