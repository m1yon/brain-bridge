import { useFormStatus } from 'react-dom'
import { Button } from '../primitives/Button'
import { DialogFooter } from '../primitives/Dialog'

const DeleteSetDialogActions = () => {
	const { pending } = useFormStatus()

	return (
		<DialogFooter>
			<Button type="submit" variant="destructive" disabled={pending}>
				Delete Set
			</Button>
		</DialogFooter>
	)
}

export default DeleteSetDialogActions
