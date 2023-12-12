import { build, perBuild } from '@jackfranklin/test-data-bot'
import faker from '../utils/faker'
import { Set } from '@/lib/data-access/interfaces/ISet'
import { flashcardBuilder } from './flashcardBuilder'

export const setBuilder = build<Set>({
	fields: {
		id: perBuild(() => faker.string.uuid()),
		name: perBuild(() => faker.lorem.words()),
		userId: perBuild(() => faker.string.uuid()),
		// calculated in postBuild
		flashcards: [],
		// calculated in postBuild
		flashcardCount: 0,
	},
	postBuild: (set) => {
		set.flashcards = flashcardBuilder.many(faker.utils.random.number(2, 10), {
			overrides: { userId: set.userId },
		})
		set.flashcardCount = set.flashcards.length

		return set
	},
})
