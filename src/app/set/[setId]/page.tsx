import DeleteSetDialog from '@/components/sets/DeleteSetDialog'
import FlashCardCreationForm from '@/components/flash-cards/FlashCardCreationForm'
import FlashCardGrid from '@/components/flash-cards/FlashCardGrid'
import { SetService } from '@/services'

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
					<h1 className="text-3xl font-bold">{set?.name}</h1>
					<p className="opacity-60">{set?.description}</p>
				</div>

				<DeleteSetDialog name={set?.name || 'N/A'} />
			</div>
			<FlashCardGrid flashCards={set?.flashCards ?? []} />
			<FlashCardCreationForm />
		</main>
	)
}
