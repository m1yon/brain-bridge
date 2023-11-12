import dotenv from 'dotenv'
import { drizzle } from 'drizzle-orm/vercel-postgres'
import { sql } from '@vercel/postgres'
import * as schema from './schema'

// required for Drizzle Kit
dotenv.config()
dotenv.config({ path: '.env.local', override: true })

export const db = drizzle(sql, { schema })
