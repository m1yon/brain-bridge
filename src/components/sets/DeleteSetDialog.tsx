'use client'

import { Button } from '../primitives/Button'
import { TrashIcon } from '@radix-ui/react-icons'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../primitives/Dialog'
import { useParams, useRouter } from 'next/navigation'
import DeleteSetDialogActions from './DeleteSetDialogActions'
import { useToast } from '@/hooks/useToast'
import { SetActions } from '@/actions'

type DeleteSetDialogProps = {
	name: string
}

const DeleteSetDialog = ({ name }: DeleteSetDialogProps) => {
	const { toast } = useToast()
	const params = useParams()
	const router = useRouter()

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="ghost" size="icon">
					<TrashIcon className="h-4 w-4" />
				</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-[425px]">
				<form
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					action={async () => {
						await SetActions.deleteSet({ id: String(params.setId) })
						router.push('/')
						toast({ description: `"${name}" has been deleted.` })
					}}
				>
					<DialogHeader>
						<DialogTitle>Delete Set?</DialogTitle>
					</DialogHeader>

					<DialogDescription className="py-4">
						Are you sure you want to delete this set? You cannot undo this
						action.
					</DialogDescription>

					<DialogFooter>
						<DeleteSetDialogActions />
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}

export default DeleteSetDialog
