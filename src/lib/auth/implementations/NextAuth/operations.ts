import { config } from '@/db/config'
import { signOut as $signOut, signIn as $signIn, auth } from '.'
import { AuthOperations, SessionSchema } from '../../interfaces/IAuth'

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
	const session = process.env.IS_SEED_RUN ? config.seed.session : await auth()

	return SessionSchema.parse(session)
}
