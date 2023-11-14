'use server'

import { sets } from '@/db/schema'
import { SetOperations } from '../interfaces/ISet'
import { db } from '@/db'
import { revalidateTag } from 'next/cache'
import { eq } from 'drizzle-orm'

export const getAllSets: SetOperations['getAllSets'] = async () => {
	const result = await db.query.sets.findMany({ with: { flashCards: true } })

	return result.map((set) => {
		return { ...set, flashCardCount: set.flashCards.length }
	})
}

export const createSet: SetOperations['createSet'] = async (args) => {
	await db.insert(sets).values(args)

	revalidateTag('get-all-sets')
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
	await db.delete(sets).where(eq(sets.id, setId))

	revalidateTag('get-all-sets')
}
