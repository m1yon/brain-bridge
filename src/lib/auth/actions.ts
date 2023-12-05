'use server'

import { signOut } from '@/auth'

export const signOutAction: typeof signOut = async (...args) => signOut(...args)
