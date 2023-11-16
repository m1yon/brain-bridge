'use server'

import { flashcards, sets } from '@/db/schema'
import { SetOperations } from '../interfaces/ISet'
import { db } from '@/db'
import { revalidateTag } from 'next/cache'
import { eq } from 'drizzle-orm'
import invariant from '@/utils/invariant'

export const getAllSets: SetOperations['getAllSets'] = async () => {
	const result = await db.query.sets.findMany({ with: { flashcards: true } })

	return result.map((set) => {
		return { ...set, flashcardCount: set.flashcards.length }
	})
}

export const createSet: SetOperations['createSet'] = async (args) => {
	const newSet = await db.transaction(async (tx) => {
		const [item] = await tx.insert(sets).values(args).returning()

		invariant(item, `Set insert returned ${String(item)}`)

		if (args.flashcards.length) {
			await tx.insert(flashcards).values(
				args.flashcards.map((flashcard) => ({
					...flashcard,
					setId: item?.id,
				})),
			)
		}

		return item
	})

	revalidateTag('get-all-sets')

	return newSet?.id
}

export const getSet: SetOperations['getSet'] = async (setId) => {
	const result = await db.query.sets.findFirst({
		where: eq(sets.id, setId),
		with: { flashcards: true },
	})

	if (!result) return

	return { ...result, flashcardCount: result.flashcards.length }
}

export const deleteSet: SetOperations['deleteSet'] = async (setId) => {
	await db.transaction(async (tx) => {
		await tx.delete(flashcards).where(eq(flashcards.setId, setId))
		await tx.delete(sets).where(eq(sets.id, setId))
	})

	revalidateTag('get-all-sets')
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

	revalidateTag(`get-set-${args.id}`)

	return
}
