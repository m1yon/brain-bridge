import { z } from 'zod'
import { isomorphicLoadEnv } from './lib/utils/isomorphicLoadEnv'

isomorphicLoadEnv()

const serverEnvVariablesSchema = z.object({
	DATABASE_HOST: z.string(),
	DATABASE_USERNAME: z.string(),
	DATABASE_PASSWORD: z.string(),
	DB_NAME: z.string(),
	DATABASE_URL: z.string(),
	IS_SEED_RUN: z.string().optional(),
})

export const serverEnvVariables = serverEnvVariablesSchema.parse(process.env)
