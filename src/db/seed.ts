import { intro, outro, spinner } from '@clack/prompts'
import { SetService, UserService } from '@/lib/services'
import { users } from './seed-data/users'
import { sets } from './seed-data/sets'

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
