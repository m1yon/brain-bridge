import { intro, outro, spinner } from '@clack/prompts'
import { SetService, UserService } from '@/lib/services'
import { users } from './seed-data/users'
import { sets } from './seed-data/sets'

intro('Seed DB')

const s = spinner()

s.start('Seeding users')

await Promise.all(
	users.map((user) => {
		return UserService.createUser(user)
	}),
)

s.stop('Users seeded')

s.start('Seeding sets and flashcards')

await Promise.all(
	sets.map(({ name, description, flashcards }) => {
		return SetService.createSet({
			name,
			description,
			flashcards,
		})
	}),
)

s.stop('Sets and flashcards seeded')

outro('Successfully seeded DB')
