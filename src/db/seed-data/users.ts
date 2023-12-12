import { Session } from '@/lib/auth/interfaces/IAuth'
import { User } from '@/lib/data-access/interfaces/IUser'

const adminUser = {
	id: 'aacdac66-7988-6e49-0b79-0d9312d0e516',
	name: 'Michael Lyon',
	email: 'github.drone477@passinbox.com',
	image: 'https://avatars.githubusercontent.com/u/37197876?v=4',
}

const normalUser = {
	id: 'bfcdac62-3948-2v43-1v54-1d93324d3c23',
	name: 'Luke Skywalker',
	email: 'lskywalker@gmail.com',
	image: 'https://avatars.githubusercontent.com/u/37197836?v=4',
}

const normalUser2 = {
	id: '537dc54a-138c-4704-badc-a4f5194ec90e',
	name: 'Darth Vader',
	email: 'vader@gmail.com',
	image: 'https://avatars.githubusercontent.com/u/12342136?v=4',
}

export const adminUserSession: Session = {
	user: adminUser,
	expires: new Date().toString(),
}

export const normalUserSession: Session = {
	user: normalUser,
	expires: new Date().toString(),
}

export const normalUser2Session: Session = {
	user: normalUser2,
	expires: new Date().toString(),
}

export const users: Array<User> = [adminUser, normalUser, normalUser2]
