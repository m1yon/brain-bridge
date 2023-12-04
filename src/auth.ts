import NextAuth from 'next-auth'
import type { NextAuthConfig } from 'next-auth'
import GitHub from 'next-auth/providers/github'

export const authConfig = {
	// pages: {
	// 	signIn: '/login',
	// },
	providers: [
		GitHub({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
	],
	callbacks: {
		authorized: async ({ auth, request: { nextUrl } }) => {
			const isLoggedIn = !!auth?.user
			const isLoginPage = nextUrl.pathname.startsWith('/login')

			if (!isLoginPage && !isLoggedIn) {
				return false
			}

			return true
		},
	},
} satisfies NextAuthConfig

export const { auth, signIn, signOut, handlers } = NextAuth({
	...authConfig,
})
