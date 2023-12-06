import NextAuth from 'next-auth'
import type { NextAuthConfig } from 'next-auth'
import GitHub from 'next-auth/providers/github'
import { UserService } from './services'
import invariant from './utils/invariant'

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
		signIn: async ({ user }) => {
			invariant(user.name, 'user.name is required')
			invariant(user.email, 'user.email is required')
			invariant(user.image, 'user.image is required')

			try {
				await UserService.createUser({
					id: user.id,
					name: user.name,
					email: user.email,
					image: user.image,
				})

				return true
			} catch {
				return false
			}
		},
	},
} satisfies NextAuthConfig

export const { auth, signIn, signOut, handlers } = NextAuth({
	...authConfig,
})
