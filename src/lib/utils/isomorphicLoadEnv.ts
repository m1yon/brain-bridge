import dotenv from 'dotenv'

// loads env variables in non-nextjs runtimes
export const isomorphicLoadEnv = () => {
	if (process.env.NEXT_RUNTIME === undefined) {
		dotenv.config()
		dotenv.config({ path: '.env.local', override: true })
	}
}
