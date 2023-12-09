import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import { isomorphicLoadEnv } from '@/lib/utils/isomorphicLoadEnv'
import * as schema from './schema'
import { serverEnvVariables } from '@/env.server'

isomorphicLoadEnv()

const client = createClient({
	url: serverEnvVariables.DATABASE_URL,
	authToken: serverEnvVariables.DATABASE_AUTH_TOKEN,
})

export const db = drizzle(client, { schema })
