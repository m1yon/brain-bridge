export interface User {
	id: string
	name: string
	email: string
	image: string | null
}

export interface UserOperations {
	createUser: (
		args: Pick<User, 'name' | 'email' | 'image'>,
	) => Promise<{ id: string }>
}
