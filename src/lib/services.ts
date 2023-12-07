import * as drizzleSetOperations from './data-access/implementations/DrizzleSet'
import * as drizzleUserOperations from './data-access/implementations/DrizzleUser'
import * as nextAuthOperations from './auth/implementations/NextAuth/operations'

import { SetOperations } from './data-access/interfaces/ISet'
import { UserOperations } from './data-access/interfaces/IUser'
import { AuthOperations } from './auth/interfaces/IAuth'

export const SetService: SetOperations = {
	...drizzleSetOperations,
}

export const UserService: UserOperations = {
	...drizzleUserOperations,
}

export const AuthService: AuthOperations = {
	...nextAuthOperations,
}
