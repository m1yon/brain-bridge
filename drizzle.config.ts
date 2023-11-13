import type { Config } from 'drizzle-kit'
import { serverEnvVariables } from './src/env.server'

export default {
	schema: './src/db/schema.ts',
	out: './drizzle/migrations',
	driver: 'pg',
	dbCredentials: {
		connectionString: serverEnvVariables.DATABASE_URL,
	},
} satisfies Config
