import CreateUpdateSetForm from '@/components/sets/CreateUpdateSetForm'
import { SetService } from '@/services'
import { unstable_cache } from 'next/cache'

export default async function UpdateSetPage({
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
			<h1 className="mb-6 text-4xl font-bold">Update {set?.name}</h1>
			<CreateUpdateSetForm setToUpdate={set} />
		</main>
	)
}
