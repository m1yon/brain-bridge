'use server'

import { z } from 'zod'
import { action } from './client'
import { SetService } from '@/lib/data-access'
import { revalidateTag } from 'next/cache'
import { getSession } from '../auth/implementations/NextAuth/operations'

const createSetSchema = z.object({
	name: z.string(),
	description: z.string().optional(),
	flashcards: z.array(
		z.object({
			term: z.string(),
			definition: z.string(),
		}),
	),
})

export const createSet = action(
	createSetSchema,
	async ({ name, description, flashcards }) => {
		const session = await getSession()
		const result = await SetService.createSet({ name, description, flashcards })

		revalidateTag(`get-sets-${session.user.id}`)

		return result
	},
)

const deleteSetSchema = z.object({
	id: z.string(),
})

export const deleteSet = action(deleteSetSchema, async ({ id }) => {
	const session = await getSession()
	const result = await SetService.deleteSet({ id })

	revalidateTag(`get-sets-${session.user.id}`)

	return result
})

const updateSetSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string().optional(),
	flashcards: z.array(
		z.object({
			id: z.string(),
			term: z.string(),
			definition: z.string(),
		}),
	),
})

export const updateSet = action(
	updateSetSchema,
	async ({ id, name, description, flashcards }) => {
		const session = await getSession()
		const result = await SetService.updateSet({
			id,
			name,
			description,
			flashcards,
		})

		revalidateTag(`get-set-${id}`)
		revalidateTag(`get-sets-${session.user.id}`)

		return result
	},
)
