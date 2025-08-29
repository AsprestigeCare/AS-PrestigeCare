'use client'

import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateProfile } from '../actions/account'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

const schema = z.object({
  name: z.string().min(1, 'Nom requis'),
  phone: z.string().optional(),
  defaultAddress: z.string().optional(),
})

export default function ProfileForm({ customer }: { customer: any }) {
  const [pending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: customer?.name || '',
      phone: customer?.phone || '',
      defaultAddress: customer?.defaultAddress || '',
    },
  })

  const onSubmit = (values: z.infer<typeof schema>) => {
    startTransition(async () => {
      try {
        await updateProfile(values)
        toast.success('Profil mis à jour')
      } catch (e: any) {
        toast.error(e.message)
      }
    })
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <Input placeholder="Nom" {...form.register('name')} />
      <Input placeholder="Téléphone" {...form.register('phone')} />
      <Input placeholder="Adresse par défaut" {...form.register('defaultAddress')} />
      <Button type="submit" disabled={pending}>
        Enregistrer
      </Button>
    </form>
  )
}
