import { unstable_cache } from 'next/cache'
import * as drizzleFlashCardOperations from './lib/data-access/implementations/DrizzleFlashCard'
import * as drizzleSetOperations from './lib/data-access/implementations/DrizzleSet'
import * as supabaseAuthOperations from './lib/data-access/implementations/SupabaseAuth'

import { FlashcardOperations } from './lib/data-access/interfaces/IFlashCard'
import { SetOperations } from './lib/data-access/interfaces/ISet'
import { AuthOperations } from './lib/data-access/interfaces/IAuth'

export const AuthService: AuthOperations = supabaseAuthOperations

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
