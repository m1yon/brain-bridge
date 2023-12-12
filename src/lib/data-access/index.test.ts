import { describe, expect, it } from 'vitest'
import { SetService, UserService } from '.'
import { userBuilder } from '../tests/builders/userBuilder'
import { setBuilder } from '../tests/builders/setBuilder'

describe('Data-access layer services', () => {
	describe('Set service', () => {
		it('can create a set', async () => {
			const set = setBuilder.one()

			const result = await SetService.createSet(set)

			expect(result).toStrictEqual({
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				id: expect.stringContaining(''),
			})
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
