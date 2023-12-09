import type { Config } from 'drizzle-kit'

export default {
	schema: './src/db/schema.ts',
	driver: 'libsql',
	out: './drizzle/migrations',
} satisfies Config
