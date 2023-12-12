import type { NextAuthConfig } from 'next-auth'
import GitHub from 'next-auth/providers/github'
import invariant from '@/lib/utils/invariant'
import { isProvider } from '@/lib/constants/Provider'
import { getUserId } from '@/lib/utils/getUserId'
import { z } from 'zod'

export const authConfig = {
	pages: {
		signIn: '/login',
	},
	providers: [
		GitHub({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
	],
	callbacks: {
		authorized: ({ auth, request: { nextUrl } }) => {
			const isLoggedIn = !!auth?.user
			const isLoginPage = nextUrl.pathname.startsWith('/login')

			if (!isLoginPage && !isLoggedIn) {
				return false
			}

			return true
		},
		signIn: async ({ user, account }) => {
			const provider = account?.provider

			invariant(user.name, 'user.name is required')
			invariant(user.email, 'user.email is required')
			invariant(user.image, 'user.image is required')

			if (!isProvider(provider)) {
				throw new Error(`expected a valid provider, got "${provider}"`)
			}

			const userId = getUserId({ id: user.id, provider })

			const result = await fetch(
				`${
					process.env.NODE_ENV === 'development'
						? 'http://localhost:3000'
						: 'https://brain-bridge.app'
				}/api/user`,
				{
					method: 'POST',
					body: JSON.stringify({
						userId,
						name: user.name,
						email: user.email,
						image: user.image,
					}),
				},
			).then((res) => res.json())

			const CreateUserOutputSchema = z.object({
				success: z.boolean(),
			})

			return CreateUserOutputSchema.parse(result).success
		},
		session: ({ session, token }) => {
			if (session.user && token.sub) {
				session.user.id = getUserId({
					id: token.sub,
					provider: 'github',
				})
			}

			return session
		},
	},
} satisfies NextAuthConfig
