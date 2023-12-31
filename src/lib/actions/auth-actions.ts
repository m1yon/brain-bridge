'use server'

import { z } from 'zod'
import { ProviderSchema } from '@/lib/constants/Provider'
import { AuthService } from '../auth'

// redirects cannot be called in try/catch blocks (actions wrapper)
export const signOut = async () => {
	await AuthService.signOut()
}

const signInSchema = z.object({
	provider: ProviderSchema,
	redirectTo: z.string().optional(),
})

// redirects cannot be called in try/catch blocks (actions wrapper)
export const signIn = async ({
	provider,
	redirectTo,
}: z.infer<typeof signInSchema>) => {
	await AuthService.signIn({ provider, redirectTo })
}
