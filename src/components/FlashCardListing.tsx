import { flashCardService } from '@/services'
import { Card, CardContent, CardHeader, CardTitle } from './primitives/Card'

const FlashCardListing = async () => {
	const flashCards = await flashCardService.getAllFlashCards()

	return (
		<div className="mt-8 flex flex-col gap-2">
			{flashCards.map(({ id, term, definition }) => (
				<Card key={id}>
					<CardHeader>
						<CardTitle>{term}</CardTitle>
					</CardHeader>
					<CardContent>{definition}</CardContent>
				</Card>
			))}
		</div>
	)
}

export default FlashCardListing
