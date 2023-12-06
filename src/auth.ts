import NextAuth from 'next-auth'
import type { NextAuthConfig } from 'next-auth'
import GitHub from 'next-auth/providers/github'
import { UserService } from './services'
import invariant from './utils/invariant'
import { getUserId } from './utils/getUserId'
import { isProvider } from './lib/constants/Provider'

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

			try {
				await UserService.createUser({
					id: userId,
					name: user.name,
					email: user.email,
					image: user.image,
				})

				return true
			} catch {
				return false
			}
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

export const { auth, signIn, signOut, handlers } = NextAuth({
	...authConfig,
})
