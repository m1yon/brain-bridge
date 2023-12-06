import DeleteSetDialog from '@/components/sets/DeleteSetDialog'
import { SetService } from '@/services'
import { Metadata } from 'next'
import { Badge } from '@/components/primitives/Badge'
import { Button } from '@/components/primitives/Button'
import {
	Pencil1Icon,
	CardStackIcon,
	ArrowLeftIcon,
} from '@radix-ui/react-icons'
import Link from 'next/link'
import { unstable_cache } from 'next/cache'

export default async function SetPage({
	params,
}: {
	params: { setId: string }
}) {
	const getSetCached = unstable_cache(
		async () => SetService.getSet({ id: params.setId }),
		[`get-set-${params.setId}`],
		{
			tags: [`get-set-${params.setId}`],
		},
	)
	const set = await getSetCached()

	return (
		<main className="mx-6 my-8">
			<div className="mb-6 flex justify-between">
				<div>
					<Link href="/">
						<Button variant="link" className="pl-0">
							<ArrowLeftIcon className="mr-1 inline" />
							Back
						</Button>
					</Link>
					<h1 className="text-4xl font-bold">{set?.name}</h1>
					<p className="mb-2 opacity-60">{set?.description}</p>
					<Badge>
						{set?.flashcardCount} {set?.flashcardCount === 1 ? 'term' : 'terms'}
					</Badge>
				</div>

				<div className="space-x-2 whitespace-nowrap">
					<Link href={`/set/${params.setId}/update`}>
						<Button variant="ghost" size="icon">
							<Pencil1Icon className="h-4 w-4" />
						</Button>
					</Link>
					<DeleteSetDialog name={set?.name || 'N/A'} />
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
				<Link href={`/set/${params.setId}/review`}>
					<Button
						variant="outline"
						className="flex w-full flex-row justify-start gap-6 px-8 py-12"
					>
						<CardStackIcon className="h-7 w-7" />
						<div className="flex flex-col items-start">
							<span className="text-xl">Review</span>{' '}
							<span className="font-normal opacity-60">
								Review terms in this set
							</span>
						</div>
					</Button>
				</Link>
			</div>
		</main>
	)
}

export async function generateMetadata({
	params,
}: {
	params: { setId: string }
}): Promise<Metadata> {
	const id = params.setId

	const set = await SetService.getSet({ id })

	return {
		title: `${set?.name} - Brain Bridge`,
	}
}
