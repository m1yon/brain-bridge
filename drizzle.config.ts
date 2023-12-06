import type { Config } from 'drizzle-kit'
import { serverEnvVariables } from './src/env.server'

export default {
	schema: './src/db/schema.ts',
	driver: 'mysql2',
	dbCredentials: {
		uri: serverEnvVariables.DATABASE_URL,
	},
} satisfies Config
