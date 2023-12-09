import dotenv from 'dotenv'
import { migrate } from 'drizzle-orm/libsql/migrator'
import { db } from '.'
import { intro, outro, spinner } from '@clack/prompts'

// required for Drizzle Kit
dotenv.config()
dotenv.config({ path: '.env.local', override: true })

intro('DB Migrations')

const s = spinner()

s.start('Running migrations')

await migrate(db, { migrationsFolder: './drizzle/migrations' })

s.stop('Migrations completed')

outro('Successfully ran all migrations')
