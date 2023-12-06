import { z } from 'zod'
import { isomorphicLoadEnv } from './utils/isomorphicLoadEnv'

isomorphicLoadEnv()

const serverEnvVariablesSchema = z.object({
	DATABASE_HOST: z.string(),
	DATABASE_USERNAME: z.string(),
	DATABASE_PASSWORD: z.string(),
	DB_NAME: z.string(),
	DATABASE_URL: z.string(),
})

export const serverEnvVariables = serverEnvVariablesSchema.parse(process.env)
