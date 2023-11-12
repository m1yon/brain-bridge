'use server'

import { db } from '@/db'
import { FlashCardOperations } from '../interfaces/IFlashCard'
import { flashCards } from '@/db/schema'

export const getAllFlashCards: FlashCardOperations['getAllFlashCards'] =
	async () => {
		return db.query.flashCards.findMany()
	}

export const createFlashCard: FlashCardOperations['createFlashCard'] = async (
	args,
) => {
	await db.insert(flashCards).values(args)
}
