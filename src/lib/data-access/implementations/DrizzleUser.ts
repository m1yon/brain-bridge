import { db } from '@/db'
import { UserOperations } from '../interfaces/IUser'
import { users } from '@/db/schema'
import invariant from '@/utils/invariant'

export const createUser: UserOperations['createUser'] = async ({
	name,
	email,
	image,
}) => {
	const [newUser] = await db
		.insert(users)
		.values({ name, email, image })
		.returning()

	invariant(newUser, 'User could not be created.')

	return newUser
}
