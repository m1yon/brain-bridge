import { drizzle } from 'drizzle-orm/planetscale-serverless'
import { connect } from '@planetscale/database'
import * as schema from './schema'
import { serverEnvVariables } from '@/env.server'
import { isomorphicLoadEnv } from '@/lib/utils/isomorphicLoadEnv'

isomorphicLoadEnv()

const connection = connect({
	host: serverEnvVariables.DATABASE_HOST,
	username: serverEnvVariables.DATABASE_USERNAME,
	password: serverEnvVariables.DATABASE_PASSWORD,
})

export const db = drizzle(connection, { schema })
