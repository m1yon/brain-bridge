import { flashCardService } from '@/services'
import FlashCard from './FlashCard'

const FlashCardListing = async () => {
	const flashCards = await flashCardService.getAllFlashCards()

	return (
		<div className="mt-8 flex flex-col gap-2">
			{flashCards.map((props) => (
				<FlashCard key={props.id} {...props} />
			))}
		</div>
	)
}

export default FlashCardListing
