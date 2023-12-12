import { faker } from '@faker-js/faker'
import { describe, expect, it } from 'vitest'
import { UserService } from '.'
import { User } from './interfaces/IUser'

describe('Data-access layer services', () => {
	describe('User service', () => {
		it('can create a user', async () => {
			const user: User = {
				id: faker.string.uuid(),
				email: faker.internet.email(),
				name: faker.person.fullName(),
				image: faker.image.avatar(),
			}

			const result = await UserService.createUser(user)

			expect(result).toStrictEqual({
				id: user.id,
			})
		})
	})
})
