import { useFormStatus } from 'react-dom'
import { Button } from '../primitives/Button'
import { CardFooter } from '../primitives/Card'

const LoginFormFooter = () => {
	const { pending } = useFormStatus()

	return (
		<CardFooter>
			<Button type="submit" disabled={pending}>
				Sign In
			</Button>
		</CardFooter>
	)
}

export default LoginFormFooter
