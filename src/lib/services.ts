import * as drizzleFlashCardOperations from './data-access/implementations/DrizzleFlashCard'
import * as drizzleSetOperations from './data-access/implementations/DrizzleSet'
import * as drizzleUserOperations from './data-access/implementations/DrizzleUser'
import * as nextAuthOperations from './auth/implementations/NextAuth/operations'

import { FlashcardOperations } from './data-access/interfaces/IFlashCard'
import { SetOperations } from './data-access/interfaces/ISet'
import { UserOperations } from './data-access/interfaces/IUser'
import { AuthOperations } from './auth/interfaces/IAuth'

export const FlashCardService: FlashcardOperations = {
	...drizzleFlashCardOperations,
}

export const SetService: SetOperations = {
	...drizzleSetOperations,
}

export const UserService: UserOperations = {
	...drizzleUserOperations,
}

export const AuthService: AuthOperations = {
	...nextAuthOperations,
}
