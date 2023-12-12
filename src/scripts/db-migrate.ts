import dotenv from 'dotenv'
import { migrate } from 'drizzle-orm/libsql/migrator'
import { intro, outro, spinner } from '@clack/prompts'

if (!process.env.DATABASE_URL) {
	dotenv.config()
	dotenv.config({ path: '.env.local', override: true })
}

const { db } = await import('../db')

intro('DB Migrations')

const s = spinner()

s.start('Running migrations')

await migrate(db, { migrationsFolder: './drizzle/migrations' })

s.stop('Migrations completed')

outro('Successfully ran all migrations')
