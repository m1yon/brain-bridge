'use server'

import { db } from '@/db'
import { FlashCardOperations } from '../interfaces/IFlashCard'
import { flashCards } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export const getAllFlashCards: FlashCardOperations['getAllFlashCards'] =
	async () => {
		return db.query.flashCards.findMany()
	}

export const createFlashCard: FlashCardOperations['createFlashCard'] = async (
	args,
) => {
	await db.insert(flashCards).values(args)

	revalidatePath('/')
}

export const deleteFlashCard: FlashCardOperations['deleteFlashCard'] = async (
	args,
) => {
	await db.delete(flashCards).where(eq(flashCards.id, args.id))

	revalidatePath('/')
}
