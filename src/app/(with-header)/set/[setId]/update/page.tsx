import { Button } from '@/components/primitives/Button'
import CreateUpdateSetForm from '@/components/sets/CreateUpdateSetForm'
import { SetService } from '@/lib/services'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { unstable_cache } from 'next/cache'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const UpdateSetPage = async ({ params }: { params: { setId: string } }) => {
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
		<main className="mx-6 my-8">
			<Link href={`/set/${set.id}`}>
				<Button variant="link" className="pl-0">
					<ArrowLeftIcon className="mr-1 inline" />
					Back
				</Button>
			</Link>
			<h1 className="mb-6 text-4xl font-bold">Update Set</h1>
			<CreateUpdateSetForm setToUpdate={set} />
		</main>
	)
}

export default UpdateSetPage
