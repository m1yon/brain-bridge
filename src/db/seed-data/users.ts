import { Session } from '@/lib/auth/interfaces/IAuth'
import { User } from '@/lib/data-access/interfaces/IUser'

const adminUser = {
	id: 'aacdac66-7988-6e49-0b79-0d9312d0e516',
	name: 'Michael Lyon',
	email: 'github.drone477@passinbox.com',
	image: 'https://avatars.githubusercontent.com/u/37197876?v=4',
}

export const adminUserSession: Session = {
	user: adminUser,
	expires: new Date().toString(),
}

export const users: Array<User> = [adminUser]
