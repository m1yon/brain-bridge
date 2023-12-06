import { intro, outro, spinner } from '@clack/prompts'
import { sets, users } from './seed-data'
import { SetService, UserService } from '@/services'

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
	sets.map(({ name, description, flashcards, userId }) => {
		return SetService.createSet({
			name,
			description,
			flashcards,
			userId,
		})
	}),
)

s.stop('Sets and flashcards seeded')

outro('Successfully seeded DB')
