import type { Config } from 'drizzle-kit'
import { serverEnvVariables } from './src/env.server'

export default {
	schema: './src/db/schema.ts',
	out: './drizzle/migrations',
	driver: 'pg',
	dbCredentials: {
		host: serverEnvVariables.POSTGRES_HOST,
		user: serverEnvVariables.POSTGRES_USER,
		password: serverEnvVariables.POSTGRES_PASSWORD,
		database: serverEnvVariables.POSTGRES_DATABASE,
	},
} satisfies Config
