import dotenv from 'dotenv'
import { migrate } from 'drizzle-orm/vercel-postgres/migrator'
import { db } from './index.js'
import { intro, outro, spinner } from '@clack/prompts'

// required for Drizzle Kit
dotenv.config()
dotenv.config({ path: '.env.local', override: true })

intro('Vercel Postgres Migrations')

const s = spinner()

s.start('Running migrations')

await migrate(db, { migrationsFolder: './drizzle/migrations' })

s.stop('Migrations completed')

outro('Successfully ran all migrations')
