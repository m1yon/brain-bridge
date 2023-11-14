import { useFormStatus } from 'react-dom'
import { Button } from '../primitives/Button'
import { DialogFooter } from '../primitives/Dialog'

type CreateUpdateSetFormActionsProps = {
	isUpdate: boolean
}

const CreateUpdateSetFormActions = ({
	isUpdate,
}: CreateUpdateSetFormActionsProps) => {
	const { pending } = useFormStatus()

	return (
		<DialogFooter>
			<Button type="submit" disabled={pending}>
				{isUpdate ? 'Update Set' : 'Create Set'}
			</Button>
		</DialogFooter>
	)
}

export default CreateUpdateSetFormActions
