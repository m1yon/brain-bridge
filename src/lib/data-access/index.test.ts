import { describe, expect, it } from 'vitest'
import { SetService, UserService } from '.'
import { userBuilder } from '../tests/builders/userBuilder'
import { setBuilder } from '../tests/builders/setBuilder'
import { normalUserSession } from '@/db/seed-data/users'

describe('Data-access layer services', () => {
	describe('Set service', () => {
		it('can create a set and immediately view the set in the set list', async () => {
			const expectedSet = setBuilder.one()

			const result = await SetService.createSet(expectedSet)

			expect(result).toStrictEqual({
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				id: expect.stringContaining(''),
			})

			const [resultSet] = await SetService.getSets()

			expect(typeof resultSet?.id).toBe('string')
			expect(resultSet?.name).toEqual(expectedSet.name)
			expect(resultSet?.description).toEqual(expectedSet.description)
			expect(resultSet?.userId).toEqual(normalUserSession.user.id)
			expect(resultSet?.flashcardCount).toEqual(expectedSet.flashcardCount)
		})
	})

	describe('User service', () => {
		it('can create a user', async () => {
			const user = userBuilder.one()

			const result = await UserService.createUser(user)

			expect(result).toStrictEqual({
				id: user.id,
			})
		})
	})
})
