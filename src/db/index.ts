import dotenv from 'dotenv'
import { drizzle } from 'drizzle-orm/planetscale-serverless'
import { connect } from '@planetscale/database'
import * as schema from './schema'
import { serverEnvVariables } from '@/env.server'

// required for Drizzle Kit
dotenv.config()
dotenv.config({ path: '.env.local', override: true })

const connection = connect({
	host: serverEnvVariables.DATABASE_HOST,
	username: serverEnvVariables.DATABASE_USERNAME,
	password: serverEnvVariables.DATABASE_PASSWORD,
})

export const db = drizzle(connection, { schema })
