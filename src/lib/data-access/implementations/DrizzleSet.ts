'use server'

import { flashCards, sets } from '@/db/schema'
import { SetOperations } from '../interfaces/ISet'
import { db } from '@/db'
import { revalidateTag } from 'next/cache'
import { eq } from 'drizzle-orm'
import invariant from '@/utils/invariant'

export const getAllSets: SetOperations['getAllSets'] = async () => {
	const result = await db.query.sets.findMany({ with: { flashCards: true } })

	return result.map((set) => {
		return { ...set, flashCardCount: set.flashCards.length }
	})
}

export const createSet: SetOperations['createSet'] = async (args) => {
	const newSet = await db.transaction(async (tx) => {
		const [item] = await tx.insert(sets).values(args).returning()

		invariant(item, `Set insert returned ${String(item)}`)

		if (args.flashCards.length) {
			await tx.insert(flashCards).values(
				args.flashCards.map((flashCard) => ({
					...flashCard,
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
		with: { flashCards: true },
	})

	if (!result) return

	return { ...result, flashCardCount: result.flashCards.length }
}

export const deleteSet: SetOperations['deleteSet'] = async (setId) => {
	await db.transaction(async (tx) => {
		await tx.delete(flashCards).where(eq(flashCards.setId, setId))
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

		for (const flashCard of args.flashCards) {
			await tx
				.update(flashCards)
				.set(flashCard)
				.where(eq(flashCards.id, flashCard.id))
		}
	})

	revalidateTag(`get-set-${args.id}`)

	return
}
