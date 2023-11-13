'use server'

import { sets } from '@/db/schema'
import { SetOperations } from '../interfaces/ISet'
import { db } from '@/db'
import { revalidateTag } from 'next/cache'
import { eq } from 'drizzle-orm'

export const getAllSets: SetOperations['getAllSets'] = async () => {
	return db.query.sets.findMany()
}

export const createSet: SetOperations['createSet'] = async (args) => {
	await db.insert(sets).values(args)

	revalidateTag('get-all-sets')
}

export const getSet: SetOperations['getSet'] = async (setId) => {
	return db.query.sets.findFirst({
		where: eq(sets.id, setId),
		with: { flashCards: true },
	})
}

export const deleteSet: SetOperations['deleteSet'] = async (setId) => {
	await db.delete(sets).where(eq(sets.id, setId))

	revalidateTag('get-all-sets')
}
