import { z } from 'zod'
import { isomorphicLoadEnv } from './lib/utils/isomorphicLoadEnv'

isomorphicLoadEnv()

const serverEnvVariablesSchema = z.object({
	DATABASE_URL: z.string(),
	DATABASE_AUTH_TOKEN: z.string(),
	IS_SEED_RUN: z.string().optional(),
})

export const serverEnvVariables = serverEnvVariablesSchema.parse(process.env)
