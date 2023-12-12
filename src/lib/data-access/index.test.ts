import { describe, expect, it, vi } from 'vitest'
import { SetService, UserService } from '.'
import { userBuilder } from '../tests/builders/userBuilder'
import { setBuilder } from '../tests/builders/setBuilder'
import { normalUser2Session, normalUserSession } from '@/db/seed-data/users'

const { mockedAuth } = await vi.hoisted(async () => {
	const { normalUserSession } = await import('@/db/seed-data/users')
	return { mockedAuth: vi.fn(() => normalUserSession) }
})

vi.mock('next-auth', () => {
	return {
		default: vi.fn(() => {
			return {
				auth: mockedAuth,
			}
		}),
	}
})

describe('Data-access layer services', () => {
	describe('Set service', () => {
		it('can create a set and immediately view the set in the set list', async () => {
			const expectedSet = setBuilder.one()

			const createSetResult = await SetService.createSet(expectedSet)

			expect(createSetResult).toStrictEqual({
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

		it('can create a set and immediately view the specific set', async () => {
			const expectedSet = setBuilder.one()

			const createSetResult = await SetService.createSet(expectedSet)

			expect(createSetResult).toStrictEqual({
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				id: expect.stringContaining(''),
			})

			const getSetResult = await SetService.getSet({ id: createSetResult.id })

			expect(typeof getSetResult?.id).toBe('string')
			expect(getSetResult?.name).toEqual(expectedSet.name)
			expect(getSetResult?.description).toEqual(expectedSet.description)
			expect(getSetResult?.userId).toEqual(normalUserSession.user.id)
			expect(getSetResult?.flashcardCount).toEqual(expectedSet.flashcardCount)

			expectedSet.flashcards.forEach((expectedFlashcard, index) => {
				const resultFlashcard = getSetResult?.flashcards[index]

				expect(typeof resultFlashcard?.id).toBe('string')
				expect(resultFlashcard?.term).toBe(expectedFlashcard.term)
				expect(resultFlashcard?.definition).toBe(expectedFlashcard.definition)
				expect(resultFlashcard?.userId).toBe(normalUserSession.user.id)
			})
		})

		it('only list sets that belong to the user', async () => {
			const expectedSet = setBuilder.one()

			const normalUserSetCreationResult =
				await SetService.createSet(expectedSet)

			expect(normalUserSetCreationResult).toStrictEqual({
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				id: expect.stringContaining(''),
			})

			mockedAuth.mockReturnValue(normalUser2Session)

			const [normalUserResultSet] = await SetService.getSets()

			expect(normalUserResultSet).toBeUndefined()

			const normalUser2SetCreationResult =
				await SetService.createSet(expectedSet)

			expect(normalUser2SetCreationResult).toStrictEqual({
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				id: expect.stringContaining(''),
			})

			const [normalUser2ResultSet] = await SetService.getSets()

			expect(typeof normalUser2ResultSet?.id).toBe('string')
			expect(normalUser2ResultSet?.name).toEqual(expectedSet.name)
			expect(normalUser2ResultSet?.description).toEqual(expectedSet.description)
			expect(normalUser2ResultSet?.userId).toEqual(normalUser2Session.user.id)
			expect(normalUser2ResultSet?.flashcardCount).toEqual(
				expectedSet.flashcardCount,
			)
		})

		it(`blocks the user from trying to access another user's sets`, async () => {
			const expectedSet = setBuilder.one()

			const createSetResult = await SetService.createSet(expectedSet)

			expect(createSetResult).toStrictEqual({
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				id: expect.stringContaining(''),
			})

			mockedAuth.mockReturnValue(normalUser2Session)

			await expect(() =>
				SetService.getSet({ id: createSetResult.id }),
			).rejects.toThrowError('Unauthorized')
		})
	})

	describe('User service', () => {
		it('can create a user', async () => {
			const user = userBuilder.one()

			const createUserResult = await UserService.createUser(user)

			expect(createUserResult).toStrictEqual({
				id: user.id,
			})
		})
	})
})
