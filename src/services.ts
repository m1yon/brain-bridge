import { unstable_cache } from 'next/cache'
import * as drizzleFlashCardOperations from './lib/data-access/implementations/DrizzleFlashCard'
import * as drizzleSetOperations from './lib/data-access/implementations/DrizzleSet'
import * as drizzleUserOperations from './lib/data-access/implementations/DrizzleUser'

import { FlashcardOperations } from './lib/data-access/interfaces/IFlashCard'
import { SetOperations } from './lib/data-access/interfaces/ISet'
import { UserOperations } from './lib/data-access/interfaces/IUser'

export const FlashCardService: FlashcardOperations = {
	...drizzleFlashCardOperations,
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

export const UserService: UserOperations = {
	...drizzleUserOperations,
}
