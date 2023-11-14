import DeleteSetDialog from '@/components/sets/DeleteSetDialog'
import FlashCardCreationForm from '@/components/flash-cards/FlashCardCreationForm'
import FlashCardGrid from '@/components/flash-cards/FlashCardGrid'
import { SetService } from '@/services'
import { Metadata } from 'next'
import { Badge } from '@/components/primitives/Badge'
import { Button } from '@/components/primitives/Button'
import { Pencil1Icon } from '@radix-ui/react-icons'
import Link from 'next/link'

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

				<div className="space-x-2">
					<Link href={`/set/${params.setId}/update`}>
						<Button variant="outline" size="icon">
							<Pencil1Icon className="h-4 w-4" />
						</Button>
					</Link>
					<DeleteSetDialog name={set?.name || 'N/A'} />
				</div>
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
