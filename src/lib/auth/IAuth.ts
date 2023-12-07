import { z } from 'zod'
import { Provider } from '../constants/Provider'

export const SessionSchema = z.object({
	user: z.object({
		id: z.string(),
		name: z.string(),
		email: z.string(),
		image: z.string(),
	}),
	expires: z.string(),
})

export type Session = z.infer<typeof SessionSchema>

export interface AuthOperations {
	signIn: (args: { provider: Provider; redirectTo?: string }) => Promise<void>
	signOut: () => Promise<void>
	getSession: () => Promise<Session>
}
