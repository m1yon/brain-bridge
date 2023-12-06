export interface User {
	id: string
	name: string
	email: string
	image: string | null
}

export interface UserOperations {
	createUser: (args: User) => Promise<{ id: string }>
}
