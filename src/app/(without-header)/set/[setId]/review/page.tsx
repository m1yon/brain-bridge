import FlashcardReviewer from '@/components/flashcards/FlashcardReviewer'
import { SetService } from '@/lib/services'
import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'

const ReviewSetPage = async ({ params }: { params: { setId: string } }) => {
	const getSetCached = unstable_cache(
		async () => SetService.getSet({ id: params.setId }),
		[`get-set-${params.setId}`],
		{
			tags: [`get-set-${params.setId}`],
		},
	)
	const set = await getSetCached()

	if (!set) {
		notFound()
	}

	return (
		<main className="h-screen">
			<FlashcardReviewer
				setId={set.id}
				setName={set.name}
				flashcards={set.flashcards || []}
			/>
		</main>
	)
}

export default ReviewSetPage
