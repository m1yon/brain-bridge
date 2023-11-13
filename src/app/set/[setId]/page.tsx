import DeleteSetDialog from '@/components/DeleteSetDialog'
import FlashCardCreationForm from '@/components/FlashCardCreationForm'
import FlashCardListing from '@/components/FlashCardListing'
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

				<DeleteSetDialog />
			</div>
			<FlashCardListing flashCards={set?.flashCards ?? []} />
			<FlashCardCreationForm />
		</main>
	)
}
