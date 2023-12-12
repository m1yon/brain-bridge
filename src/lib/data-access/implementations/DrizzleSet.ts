'use server'

import { flashcards, sets } from '@/db/schema'
import { SetOperations } from '../interfaces/ISet'
import { db } from '@/db'
import { and, eq } from 'drizzle-orm'
import { v4 as uuidv4 } from 'uuid'
import { nullsToUndefined } from '@/lib/utils/nullsToUndefined'
import { getSession } from '@/lib/auth/implementations/NextAuth/operations'
import { AuthService } from '@/lib/auth'

export const createSet: SetOperations['createSet'] = async (args) => {
	const newSetId = uuidv4()

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	await db.transaction(async (tx) => {
		const session = await AuthService.getSession()
		const userId = session.user.id

		await tx.insert(sets).values({ ...args, id: newSetId, userId })

		if (args.flashcards.length) {
			await tx.insert(flashcards).values(
				args.flashcards.map((flashcard) => ({
					...flashcard,
					setId: newSetId,
					id: uuidv4(),
					userId,
				})),
			)
		}
	})

	return { id: newSetId }
}

export const getSets: SetOperations['getSets'] = async () => {
	const session = await getSession()

	const result = await db.query.sets.findMany({
		with: { flashcards: true },
		where: eq(sets.userId, session.user.id),
	})

	return result.map((set) => {
		return {
			...set,
			flashcardCount: set.flashcards.length,
			description: set.description ?? undefined,
		}
	})
}

export const getSet: SetOperations['getSet'] = async ({ id }) => {
	const session = await getSession()

	const result = await db.query.sets.findFirst({
		where: and(eq(sets.id, id), eq(sets.userId, session.user.id)),
		with: { flashcards: true },
	})

	if (!result) return

	return nullsToUndefined({
		...result,
		flashcardCount: result.flashcards.length,
	})
}

export const deleteSet: SetOperations['deleteSet'] = async ({ id }) => {
	const session = await getSession()

	await db.transaction(async (tx) => {
		await tx
			.delete(flashcards)
			.where(
				and(eq(flashcards.setId, id), eq(flashcards.userId, session.user.id)),
			)

		await tx
			.delete(sets)
			.where(and(eq(sets.id, id), eq(sets.userId, session.user.id)))
	})

	return { success: true }
}

export const updateSet: SetOperations['updateSet'] = async (args) => {
	const session = await getSession()

	await db.transaction(async (tx) => {
		await tx
			.update(sets)
			.set({ name: args.name, description: args.description })
			.where(and(eq(sets.id, args.id), eq(sets.userId, session.user.id)))

		for (const flashcard of args.flashcards) {
			await tx
				.update(flashcards)
				.set(flashcard)
				.where(
					and(
						eq(flashcards.id, flashcard.id),
						eq(flashcards.userId, session.user.id),
					),
				)
		}
	})

	return { success: true }
}
