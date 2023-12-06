'use server'

import { db } from '@/db'
import { FlashcardOperations } from '../interfaces/IFlashCard'
import { flashcards } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { v4 as uuidv4 } from 'uuid'

export const createFlashcard: FlashcardOperations['createFlashcard'] = async (
	args,
) => {
	const newFlashcardId = uuidv4()

	await db.insert(flashcards).values({ ...args, id: newFlashcardId })

	return { id: newFlashcardId }
}

export const deleteFlashcard: FlashcardOperations['deleteFlashcard'] = async (
	args,
) => {
	await db.delete(flashcards).where(eq(flashcards.id, args.id))

	return { success: true }
}

export const updateFlashcard: FlashcardOperations['updateFlashcard'] = async (
	args,
) => {
	await db.update(flashcards).set(args).where(eq(flashcards.id, args.id))

	return { success: true }
}
