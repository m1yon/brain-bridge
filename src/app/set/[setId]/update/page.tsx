import CreateUpdateSetForm from '@/components/sets/CreateUpdateSetForm'
import { SetService } from '@/services'

export default async function UpdateSetPage({
	params,
}: {
	params: { setId: string }
}) {
	const set = await SetService.getSet(params.setId)

	return (
		<main className="mx-6 my-12">
			<h1 className="mb-6 text-4xl font-bold">Update {set?.name}</h1>
			<CreateUpdateSetForm setToUpdate={set} />
		</main>
	)
}
