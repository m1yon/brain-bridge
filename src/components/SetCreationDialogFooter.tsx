import { useFormStatus } from 'react-dom'
import { Button } from './primitives/Button'
import { DialogFooter } from './primitives/Dialog'

type SetCreationDialogFooterProps = { onCancel: () => void }

const SetCreationDialogFooter = ({
	onCancel,
}: SetCreationDialogFooterProps) => {
	const { pending } = useFormStatus()

	return (
		<DialogFooter>
			<Button type="submit" disabled={pending}>
				Create
			</Button>
			<Button
				type="button"
				variant="ghost"
				onClick={() => {
					onCancel()
				}}
				disabled={pending}
			>
				Cancel
			</Button>
		</DialogFooter>
	)
}

export default SetCreationDialogFooter
