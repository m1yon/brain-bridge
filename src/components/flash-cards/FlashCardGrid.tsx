import { FlashCard as FlashCardType } from '@/lib/data-access/interfaces/IFlashCard'
import FlashCard from './FlashCard'

type FlashCardGridProps = {
	flashCards: FlashCardType[]
}

const FlashCardGrid = ({ flashCards }: FlashCardGridProps) => {
	return (
		<div className="mb-4 flex flex-col gap-4">
			{flashCards.map((props) => (
				<FlashCard key={props.id} {...props} />
			))}
		</div>
	)
}

export default FlashCardGrid
