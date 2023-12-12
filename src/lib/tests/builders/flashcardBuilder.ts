import { build, perBuild } from '@jackfranklin/test-data-bot'
import faker from '../utils/faker'
import { Flashcard } from '@/lib/data-access/interfaces/IFlashcard'

export const flashcardBuilder = build<Flashcard>({
	fields: {
		id: perBuild(() => faker.string.uuid()),
		term: perBuild(() => faker.lorem.word()),
		definition: perBuild(() => faker.lorem.sentence()),
		userId: perBuild(() => faker.string.uuid()),
	},
})
