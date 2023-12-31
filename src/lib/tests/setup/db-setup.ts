import './mock-setup'
import path from 'node:path'
import fsExtra from 'fs-extra'
import { afterAll, beforeEach } from 'vitest'
import { BASE_DATABASE_PATH } from './global-setup'

/**
 * This setup file generates individual DBs for each test runner, as well
 * as ensures test isolation by cleaning up after each test.
 * */
const databaseFile = `./test-dbs/${process.env.VITEST_POOL_ID || 0}.db`
const databasePath = path.join(process.cwd(), databaseFile)
process.env.DATABASE_URL = `file:${databasePath}`

beforeEach(async () => {
	await fsExtra.copyFile(BASE_DATABASE_PATH, databasePath)
})

afterAll(async () => {
	await fsExtra.remove(databasePath)
})
