import DeleteSetDialog from '@/components/sets/DeleteSetDialog'
import FlashCardCreationForm from '@/components/flash-cards/FlashCardCreationForm'
import FlashCardGrid from '@/components/flash-cards/FlashCardGrid'
import { SetService } from '@/services'
import { Metadata } from 'next'
import { Badge } from '@/components/primitives/Badge'

export default async function SetPage({
	params,
}: {
	params: { setId: string }
}) {
	const set = await SetService.getSet(params.setId)

	return (
		<main className="mx-6 my-12">
			<div className="mb-6 flex justify-between">
				<div>
					<h1 className="text-4xl font-bold">{set?.name}</h1>
					<p className="mb-2 opacity-60">{set?.description}</p>
					<Badge>
						{set?.flashCardCount} {set?.flashCardCount === 1 ? 'term' : 'terms'}
					</Badge>
				</div>

				<DeleteSetDialog name={set?.name || 'N/A'} />
			</div>
			<FlashCardGrid flashCards={set?.flashCards ?? []} />
			<FlashCardCreationForm />
		</main>
	)
}

export async function generateMetadata({
	params,
}: {
	params: { setId: string }
}): Promise<Metadata> {
	const id = params.setId

	const set = await SetService.getSet(id)

	return {
		title: `${set?.name} - Brain Bridge`,
	}
}
