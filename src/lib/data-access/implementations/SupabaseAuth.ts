'use server'

import { cookies } from 'next/headers'
import { AuthOperations } from '../interfaces/IAuth'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'

export const login: AuthOperations['login'] = async ({ email, password }) => {
	const cookieStore = cookies()
	const supabase = createRouteHandlerClient<unknown>({
		cookies: () => cookieStore,
	})

	const { error } = await supabase.auth.signInWithPassword({
		email,
		password,
	})

	return { error: error ? { message: error.message } : undefined }
}
