import { SetService } from '@/services'
import FlashCard from './FlashCard'

type FlashCardListingProps = {
	setId: string
}

const FlashCardListing = async ({ setId }: FlashCardListingProps) => {
	const set = await SetService.getSet(setId)

	if (!set) {
		return null
	}

	return (
		<div className="mb-4 flex flex-col gap-4">
			{set.flashCards.map((props) => (
				<FlashCard key={props.id} {...props} />
			))}
		</div>
	)
}

export default FlashCardListing
