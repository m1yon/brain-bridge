import * as nextAuthOperations from '../auth/implementations/NextAuth/operations'
import { AuthOperations } from '../auth/interfaces/IAuth'

export const AuthService: AuthOperations = {
	...nextAuthOperations,
}
