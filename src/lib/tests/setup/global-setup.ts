import path from 'node:path'
import fsExtra from 'fs-extra'
import { execaCommand } from 'execa'

export const BASE_DATABASE_PATH = path.join(process.cwd(), `./test-dbs/base.db`)

export async function setup() {
	const databaseExists = await fsExtra.pathExists(BASE_DATABASE_PATH)
	if (databaseExists) return

	// setup base DB for others to clone from
	await execaCommand(`mkdir -p test-dbs`)
	await execaCommand(`touch test-dbs/base.db`)

	await execaCommand('pnpm migrations:generate', {
		stdio: 'inherit',
	})
	await execaCommand('pnpm migrations:run', {
		stdio: 'inherit',
		env: {
			...process.env,
			DATABASE_URL: `file:${BASE_DATABASE_PATH}`,
		},
	})
	await execaCommand('pnpm db:seed', {
		stdio: 'inherit',
		env: {
			...process.env,
			DATABASE_URL: `file:${BASE_DATABASE_PATH}`,
		},
	})
}
