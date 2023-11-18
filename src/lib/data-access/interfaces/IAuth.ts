export interface AuthOperations {
	login(args: {
		email: string
		password: string
	}): Promise<{ error?: { message: string } }>
}
