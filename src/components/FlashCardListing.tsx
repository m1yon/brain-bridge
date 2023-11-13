import { flashCardService } from '@/services'
import FlashCard from './FlashCard'

const FlashCardListing = async () => {
	const flashCards = await flashCardService.cache.getAllFlashCards()

	return (
		<div className="mb-4 flex flex-col gap-4">
			{flashCards.map((props) => (
				<FlashCard key={props.id} {...props} />
			))}
		</div>
	)
}

export default FlashCardListing
