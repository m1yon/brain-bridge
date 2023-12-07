import { signOut as $signOut, signIn as $signIn, auth } from '.'
import { AuthOperations, SessionSchema } from '../../interfaces/IAuth'
import { adminUserSession } from '@/db/seed-data/users'

export const signIn: AuthOperations['signIn'] = async ({
	provider,
	redirectTo,
}) => {
	await $signIn(provider, { redirectTo })
}

export const signOut: AuthOperations['signOut'] = async () => {
	await $signOut()
}

export const getSession: AuthOperations['getSession'] = async () => {
	const session = process.env.IS_SEED_RUN ? adminUserSession : await auth()

	return SessionSchema.parse(session)
}
