import { userBuilder } from '@/lib/tests/builders/userBuilder'
import { describe, expect, it } from 'vitest'
import { UserService } from '..'

describe('User service', () => {
	describe('Create', () => {
		it('can create a user', async () => {
			const user = userBuilder.one()

			const createUserResult = await UserService.createUser(user)

			expect(createUserResult).toStrictEqual({
				id: user.id,
			})
		})
	})
})
