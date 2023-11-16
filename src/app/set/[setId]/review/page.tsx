import FlashcardReviewer from '@/components/flashcards/Flashcard'
import { SetService } from '@/services'
import { unstable_cache } from 'next/cache'

export default async function ReviewSetPage({
	params,
}: {
	params: { setId: string }
}) {
	const getSetCached = unstable_cache(
		async () => SetService.getSet(params.setId),
		[`get-set-${params.setId}`],
		{
			tags: [`get-set-${params.setId}`],
		},
	)
	const set = await getSetCached()

	return (
		<main className="mx-6 my-12">
			<FlashcardReviewer flashcards={set?.flashcards || []} />
		</main>
	)
}
