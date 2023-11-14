'use server'

import { db } from '@/db'
import { FlashCardOperations } from '../interfaces/IFlashCard'
import { flashCards } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { revalidateTag } from 'next/cache'
import invariant from '@/utils/invariant'

export const createFlashCard: FlashCardOperations['createFlashCard'] = async (
	args,
) => {
	await db.insert(flashCards).values(args)

	revalidateTag(`get-set-${args.setId}`)
	revalidateTag('get-all-sets')
}

export const deleteFlashCard: FlashCardOperations['deleteFlashCard'] = async (
	args,
) => {
	const [deletedFlashCard] = await db
		.delete(flashCards)
		.where(eq(flashCards.id, args.id))
		.returning()

	invariant(deletedFlashCard, 'No flash card returned from deletion')

	revalidateTag(`get-set-${deletedFlashCard.setId}`)
	revalidateTag('get-all-sets')
}

export const updateFlashCard: FlashCardOperations['updateFlashCard'] = async (
	args,
) => {
	const [updatedFlashCard] = await db
		.update(flashCards)
		.set(args)
		.where(eq(flashCards.id, args.id))
		.returning()

	invariant(updatedFlashCard, 'No flash card returned from update')

	revalidateTag(`get-set-${updatedFlashCard.setId}`)
}
