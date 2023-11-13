import { unstable_cache } from 'next/cache'
import * as drizzleFlashCardOperations from './lib/data-access/implementations/DrizzleFlashCard'
import * as drizzleSetOperations from './lib/data-access/implementations/DrizzleSet'
import { FlashCardOperations } from './lib/data-access/interfaces/IFlashCard'
import { SetOperations } from './lib/data-access/interfaces/ISet'

export const FlashCardService: FlashCardOperations & {
	cache: Pick<FlashCardOperations, 'getAllFlashCards'>
} = {
	...drizzleFlashCardOperations,
	cache: {
		getAllFlashCards: unstable_cache(
			async () => FlashCardService.getAllFlashCards(),
			['get-all-flash-cards'],
			{ tags: ['get-all-flash-cards'] },
		),
	},
}

export const SetService: SetOperations & {
	cache: Pick<SetOperations, 'getAllSets'>
} = {
	...drizzleSetOperations,
	cache: {
		getAllSets: unstable_cache(
			async () => SetService.getAllSets(),
			['get-all-sets'],
			{ tags: ['get-all-sets'] },
		),
	},
}
