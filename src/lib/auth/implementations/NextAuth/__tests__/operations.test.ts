import { afterEach, describe, expect, it, vi } from 'vitest'
import { getSession } from '../operations'
import { Session } from '../../../interfaces/IAuth'
import { adminUserSession } from '@/db/seed-data/users'

vi.mock('next-auth', () => {
	const fakeSession: Session = {
		user: {
			id: 'kf9dsjakf90dja90fdjsafds',
			name: 'Fake Guy',
			email: 'fakeguy@fake.com',
			image: 'https://google.com/not-an-image.png',
		},
		expires: '',
	}
	return { default: vi.fn(() => ({ auth: vi.fn(() => fakeSession) })) }
})

describe('getSession', () => {
	afterEach(() => {
		vi.unstubAllEnvs()
	})

	it('returns the expected user when IS_SEED_RUN is NOT set', async () => {
		const result = await getSession()
		expect(result).toStrictEqual({
			user: {
				id: 'kf9dsjakf90dja90fdjsafds',
				name: 'Fake Guy',
				email: 'fakeguy@fake.com',
				image: 'https://google.com/not-an-image.png',
			},
			expires: '',
		})
	})

	it('returns the admin user when IS_SEED_RUN is set', async () => {
		vi.stubEnv('IS_SEED_RUN', 'true')

		const result = await getSession()
		expect(result).toStrictEqual(adminUserSession)
	})
})
