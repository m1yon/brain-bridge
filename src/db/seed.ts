import { intro, outro, spinner } from '@clack/prompts'
import { seedData } from './seed-data'
import { SetService } from '@/services'

intro('Seed DB')

const s = spinner()

s.start('Seeding sets and flashcards')

await Promise.all(
	seedData.map(({ name, description, flashcards }) => {
		return SetService.createSet({ name, description, flashcards })
	}),
)

s.stop('Sets seeded and flashcards')

outro('Successfully seeded DB')
