'use server'

import { db } from '@/db'
import { UserOperations } from '../interfaces/IUser'
import { users } from '@/db/schema'

export const createUser: UserOperations['createUser'] = async ({
	id,
	name,
	email,
	image,
}) => {
	await db
		.insert(users)
		.values({ id, name, email, image })
		// do nothing if the user already exists
		.onDuplicateKeyUpdate({ set: { id } })

	return { id }
}
