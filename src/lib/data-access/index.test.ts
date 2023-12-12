import { describe, expect, it, vi } from 'vitest'
import { SetService, UserService } from '.'
import { userBuilder } from '../tests/builders/userBuilder'
import { setBuilder } from '../tests/builders/setBuilder'
import { normalUser2Session, normalUserSession } from '@/db/seed-data/users'
import faker from '../tests/utils/faker'

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

		it('can create a set', async () => {
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

		it(`can delete a set`, async () => {
			const expectedSet = setBuilder.one()

			const createSetResult = await SetService.createSet(expectedSet)

			expect(createSetResult).toStrictEqual({
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				id: expect.stringContaining(''),
			})

			const { success } = await SetService.deleteSet({ id: createSetResult.id })
			expect(success).toBe(true)

			const setList = await SetService.getSets()
			expect(setList).toStrictEqual([])

			const specificSet = await SetService.getSet({ id: createSetResult.id })
			expect(specificSet).toBeUndefined()
		})

		it(`blocks the user from trying to delete another user's sets`, async () => {
			const expectedSet = setBuilder.one()

			const createSetResult = await SetService.createSet(expectedSet)
			expect(createSetResult).toStrictEqual({
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				id: expect.stringContaining(''),
			})

			mockedAuth.mockReturnValue(normalUser2Session)

			await expect(() =>
				SetService.deleteSet({ id: createSetResult.id }),
			).rejects.toThrowError('Unauthorized')
		})

		it('can update a set', async () => {
			const initialSet = setBuilder.one()

			const createSetResult = await SetService.createSet(initialSet)
			expect(createSetResult).toStrictEqual({
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				id: expect.stringContaining(''),
			})

			const initialGetSetResult = await SetService.getSet({
				id: createSetResult.id,
			})
			expect(typeof initialGetSetResult?.id).toBe('string')
			expect(initialGetSetResult?.name).toEqual(initialSet.name)
			expect(initialGetSetResult?.description).toEqual(initialSet.description)
			expect(initialGetSetResult?.userId).toEqual(normalUserSession.user.id)
			expect(initialGetSetResult?.flashcardCount).toEqual(
				initialSet.flashcardCount,
			)

			initialSet.flashcards.forEach((expectedFlashcard, index) => {
				const resultFlashcard = initialGetSetResult?.flashcards[index]

				expect(typeof resultFlashcard?.id).toBe('string')
				expect(resultFlashcard?.term).toBe(expectedFlashcard.term)
				expect(resultFlashcard?.definition).toBe(expectedFlashcard.definition)
				expect(resultFlashcard?.userId).toBe(normalUserSession.user.id)
			})

			const updatedFlashcards =
				initialGetSetResult?.flashcards.map((flashcard) => {
					return {
						...flashcard,
						term: faker.lorem.word(),
						definition: faker.lorem.sentence(),
					}
				}) ?? []

			const updatedSet = {
				...setBuilder.one(),
				flashcards: updatedFlashcards,
				flashcardCount: updatedFlashcards.length,
			}

			const updateSetResult = await SetService.updateSet({
				id: createSetResult.id,
				name: updatedSet.name,
				description: updatedSet.description,
				flashcards: updatedSet.flashcards,
			})
			expect(updateSetResult).toStrictEqual({
				success: true,
			})

			const newGetSetResult = await SetService.getSet({
				id: createSetResult.id,
			})
			expect(typeof newGetSetResult?.id).toBe('string')
			expect(newGetSetResult?.name).toEqual(updatedSet.name)
			expect(newGetSetResult?.description).toEqual(updatedSet.description)
			expect(newGetSetResult?.userId).toEqual(normalUserSession.user.id)
			expect(newGetSetResult?.flashcardCount).toEqual(updatedSet.flashcardCount)

			updatedSet.flashcards.forEach((expectedFlashcard, index) => {
				const resultFlashcard = newGetSetResult?.flashcards[index]

				expect(typeof resultFlashcard?.id).toBe('string')
				expect(resultFlashcard?.term).toBe(expectedFlashcard.term)
				expect(resultFlashcard?.definition).toBe(expectedFlashcard.definition)
				expect(resultFlashcard?.userId).toBe(normalUserSession.user.id)
			})
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
