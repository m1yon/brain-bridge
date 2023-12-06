'use server'

import { db } from '@/db'
import { UserOperations } from '../interfaces/IUser'
import { users } from '@/db/schema'
import { v4 as uuidv4 } from 'uuid'

export const createUser: UserOperations['createUser'] = async ({
	name,
	email,
	image,
}) => {
	const newUserId = uuidv4()

	await db.insert(users).values({ name, email, image, id: newUserId })

	return { id: newUserId }
}
