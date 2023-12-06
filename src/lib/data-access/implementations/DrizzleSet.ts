'use server'

import { flashcards, sets } from '@/db/schema'
import { SetOperations } from '../interfaces/ISet'
import { db } from '@/db'
import { eq } from 'drizzle-orm'
import { v4 as uuidv4 } from 'uuid'
import { nullsToUndefined } from '@/utils/nullsToUndefined'

export const createSet: SetOperations['createSet'] = async (args) => {
	const newSetId = uuidv4()

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	await db.transaction(async (tx) => {
		await tx.insert(sets).values({ ...args, id: newSetId })

		if (args.flashcards.length) {
			await tx.insert(flashcards).values(
				args.flashcards.map((flashcard) => ({
					...flashcard,
					setId: newSetId,
					id: uuidv4(),
					userId: args.userId,
				})),
			)
		}
	})

	return { id: newSetId }
}

export const getAllSets: SetOperations['getAllSets'] = async () => {
	const result = await db.query.sets.findMany({ with: { flashcards: true } })

	return result.map((set) => {
		return {
			...set,
			flashcardCount: set.flashcards.length,
			description: set.description ?? undefined,
		}
	})
}

export const getSet: SetOperations['getSet'] = async ({ id }) => {
	const result = await db.query.sets.findFirst({
		where: eq(sets.id, id),
		with: { flashcards: true },
	})

	if (!result) return

	return nullsToUndefined({
		...result,
		flashcardCount: result.flashcards.length,
	})
}

export const deleteSet: SetOperations['deleteSet'] = async ({ id }) => {
	await db.transaction(async (tx) => {
		await tx.delete(flashcards).where(eq(flashcards.setId, id))
		await tx.delete(sets).where(eq(sets.id, id))
	})

	return { success: true }
}

export const updateSet: SetOperations['updateSet'] = async (args) => {
	await db.transaction(async (tx) => {
		await tx
			.update(sets)
			.set({ name: args.name, description: args.description })
			.where(eq(sets.id, args.id))

		for (const flashcard of args.flashcards) {
			await tx
				.update(flashcards)
				.set(flashcard)
				.where(eq(flashcards.id, flashcard.id))
		}
	})

	return { success: true }
}
