import { FlashCard } from '@/lib/data-access/interfaces/IFlashCard'
import { flashCardService } from '@/services'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from './primitives/Card'
import { Button } from './primitives/Button'
import { TrashIcon } from '@radix-ui/react-icons'

type FlashCardProps = FlashCard

const FlashCard = ({ id, term, definition }: FlashCardProps) => {
	const deleteFlashCardWithId = flashCardService.deleteFlashCard.bind(null, {
		id,
	})

	return (
		<Card key={id}>
			<CardHeader>
				<CardTitle>{term}</CardTitle>
			</CardHeader>
			<CardContent>{definition}</CardContent>
			<CardFooter>
				{/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
				<form action={deleteFlashCardWithId}>
					<Button variant="outline" size="sm">
						<TrashIcon className="mr-2 h-4 w-4" /> Delete
					</Button>
				</form>
			</CardFooter>
		</Card>
	)
}

export default FlashCard
