'use server'

import { AuthService } from '@/lib/services'
import { z } from 'zod'
import { action } from './client'
import { ProviderSchema } from '@/lib/constants/Provider'

const signOutSchema = z.void()

export const signOut = action(signOutSchema, async () => {
	await AuthService.signOut()
})

const signInSchema = z.object({
	provider: ProviderSchema,
	redirectTo: z.string().optional(),
})

export const signIn = action(signInSchema, async ({ provider, redirectTo }) => {
	await AuthService.signIn({ provider, redirectTo })
})