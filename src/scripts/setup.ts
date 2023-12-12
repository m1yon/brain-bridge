import '../lib/tests/setup/setup-env'
import { intro, outro } from '@clack/prompts'
import path from 'path'
import fsExtra from 'fs-extra'
import { execaCommand } from 'execa'

intro('Setting up project')

// start from a clean slate
await execaCommand(`rm -rf ./test-dbs`)

export const DEV_DATABASE_PATH = path.join(process.cwd(), `./test-dbs/dev.db`)

const databaseExists = await fsExtra.pathExists(DEV_DATABASE_PATH)
if (!databaseExists) {
	// setup base DB for others to clone from
	await execaCommand(`mkdir -p test-dbs`)
	await execaCommand(`touch test-dbs/dev.db`)

	await execaCommand('pnpm migrations:generate', {
		stdio: 'inherit',
	})
	await execaCommand('pnpm migrations:run', {
		stdio: 'inherit',
		env: {
			...process.env,
			DATABASE_URL: `file:${DEV_DATABASE_PATH}`,
		},
	})
	await execaCommand('pnpm db:seed', {
		stdio: 'inherit',
		env: {
			...process.env,
			DATABASE_URL: `file:${DEV_DATABASE_PATH}`,
		},
	})
}

await execaCommand('vitest run', {
	stdio: 'inherit',
})

outro('Project setup complete')
