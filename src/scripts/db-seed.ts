import dotenv from 'dotenv'
import { intro, outro, spinner } from '@clack/prompts'

if (!process.env.DATABASE_URL) {
	dotenv.config()
	dotenv.config({ path: '.env.local', override: true })
}

const { SetService, UserService } = await import('@/lib/data-access')
const { users } = await import('../db/seed-data/users')
const { sets } = await import('../db/seed-data/sets')

intro('Seed DB')

const s = spinner()

s.start('Seeding users')

for await (const user of users) {
	await UserService.createUser(user)
}

s.stop('Users seeded')

s.start('Seeding sets and flashcards')

for await (const set of sets) {
	await SetService.createSet(set)
}

s.stop('Sets and flashcards seeded')

outro('Successfully seeded DB')
