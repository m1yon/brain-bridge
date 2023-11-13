import { intro, outro, spinner } from '@clack/prompts'
import { db } from '.'
import { sets, flashCards } from './schema'
import { seedData } from './seed-data'

intro('Seed DB')

const s = spinner()
s.start('Seeding sets')

const createdSets = await db
	.insert(sets)
	.values(seedData.map(({ name, description }) => ({ name, description })))
	.returning()

s.stop('Sets seeded')

s.start('Seeding flash cards')

await db.insert(flashCards).values(
	createdSets
		.flatMap(({ id }, index) => {
			const seedSet = seedData[index]
			return seedSet?.flashCards.map((card) => ({ ...card, setId: id }))
		})
		.filter(Boolean),
)

s.stop('Flash cards seeded')

outro('Successfully seeded DB')
