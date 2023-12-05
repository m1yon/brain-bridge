import { signOut } from '@/auth'
import { Button } from '../primitives/Button'

const SignOutButton = () => {
	return (
		<form
			// eslint-disable-next-line @typescript-eslint/no-misused-promises
			action={async () => {
				'use server'
				await signOut()
			}}
		>
			<Button variant="ghost">Sign Out</Button>
		</form>
	)
}

export default SignOutButton
