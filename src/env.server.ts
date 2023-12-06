import dotenv from 'dotenv'
import { z } from 'zod'

// required for Drizzle Kit
dotenv.config()
dotenv.config({ path: '.env.local', override: true })

const serverEnvVariablesSchema = z.object({
	DATABASE_HOST: z.string(),
	DATABASE_USERNAME: z.string(),
	DATABASE_PASSWORD: z.string(),
	DB_NAME: z.string(),
	DATABASE_URL: z.string(),
})

export const serverEnvVariables = serverEnvVariablesSchema.parse(process.env)
