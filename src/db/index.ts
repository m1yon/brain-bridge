import dotenv from 'dotenv'
import postgres from 'postgres'
import * as schema from './schema'
import { drizzle } from 'drizzle-orm/postgres-js'

// required for Drizzle Kit
dotenv.config()
dotenv.config({ path: '.env.local', override: true })

const connectionString = process.env.DATABASE_URL!
const client = postgres(connectionString, {
	idle_timeout: 20,
	max_lifetime: 60,
})
export const db = drizzle(client, { schema })
