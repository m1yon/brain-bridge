import dotenv from 'dotenv'
import { z } from 'zod'

// required for Drizzle Kit
dotenv.config()
dotenv.config({ path: '.env.local', override: true })

const serverEnvVariablesSchema = z.object({
	POSTGRES_HOST: z.string(),
	POSTGRES_USER: z.string(),
	POSTGRES_PASSWORD: z.string(),
	POSTGRES_DATABASE: z.string(),
})

export const serverEnvVariables = serverEnvVariablesSchema.parse(process.env)
