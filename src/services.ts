import { unstable_cache } from 'next/cache'
import * as drizzleFlashCardOperations from './lib/data-access/implementations/DrizzleFlashCard'
import { FlashCardOperations } from './lib/data-access/interfaces/IFlashCard'

export const flashCardService: FlashCardOperations & {
	cache: Pick<FlashCardOperations, 'getAllFlashCards'>
} = {
	...drizzleFlashCardOperations,
	cache: {
		getAllFlashCards: unstable_cache(
			async () => flashCardService.getAllFlashCards(),
			['get-all-flash-cards'],
			{ tags: ['get-all-flash-cards'] },
		),
	},
}
