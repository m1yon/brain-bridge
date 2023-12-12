import { normalUserSession } from '@/db/seed-data/users'
import { vi } from 'vitest'

export const signIn = vi.fn()

export default vi.fn(() => {
	return {
		auth: vi.fn(() => normalUserSession),
		signIn: vi.fn(),
		signOut: vi.fn(),
		handlers: vi.fn(),
	}
})
