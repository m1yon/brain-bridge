'use server'

import { db } from '@/db'
import { FlashcardOperations } from '../interfaces/IFlashCard'
import { flashcards } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { revalidateTag } from 'next/cache'
import invariant from '@/utils/invariant'

export const createFlashcard: FlashcardOperations['createFlashcard'] = async (
	args,
) => {
	await db.insert(flashcards).values(args)

	revalidateTag(`get-set-${args.setId}`)
	revalidateTag('get-all-sets')
}

export const deleteFlashcard: FlashcardOperations['deleteFlashcard'] = async (
	args,
) => {
	const [deletedFlashCard] = await db
		.delete(flashcards)
		.where(eq(flashcards.id, args.id))
		.returning()

	invariant(deletedFlashCard, 'No flash card returned from deletion')

	revalidateTag(`get-set-${deletedFlashCard.setId}`)
	revalidateTag('get-all-sets')
}

export const updateFlashcard: FlashcardOperations['updateFlashcard'] = async (
	args,
) => {
	const [updatedFlashCard] = await db
		.update(flashcards)
		.set(args)
		.where(eq(flashcards.id, args.id))
		.returning()

	invariant(updatedFlashCard, 'No flash card returned from update')

	revalidateTag(`get-set-${updatedFlashCard.setId}`)
}
