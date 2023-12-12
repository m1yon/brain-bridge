import * as drizzleSetOperations from './implementations/DrizzleSet'
import * as drizzleUserOperations from './implementations/DrizzleUser'

import { SetOperations } from './interfaces/ISet'
import { UserOperations } from './interfaces/IUser'

export const SetService: SetOperations = {
	...drizzleSetOperations,
}

export const UserService: UserOperations = {
	...drizzleUserOperations,
}
