import { useFormStatus } from 'react-dom'
import { Button } from '../primitives/Button'
import { DialogFooter } from '../primitives/Dialog'

const CreateUpdateSetFormActions = () => {
	const { pending } = useFormStatus()

	return (
		<DialogFooter>
			<Button type="submit" disabled={pending}>
				Create Set
			</Button>
		</DialogFooter>
	)
}

export default CreateUpdateSetFormActions
