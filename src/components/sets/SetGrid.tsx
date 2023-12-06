import { SetService } from '@/services'
import Set from './Set'
import { Button } from '../primitives/Button'
import { PlusIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { unstable_cache } from 'next/cache'

const SetGrid = async () => {
	const getAllSetsCached = unstable_cache(
		async () => SetService.getAllSets(),
		[`get-all-sets`],
		{
			tags: [`get-all-sets`],
		},
	)
	const sets = await getAllSetsCached()

	return (
		<div className="mb-4 grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			{sets.map((props) => (
				<Set key={props.id} {...props} />
			))}
			<Button variant="secondary" className="h-full w-full" asChild>
				<Link href="set/create">
					<PlusIcon className="h-5 w-5" />
				</Link>
			</Button>
		</div>
	)
}

export default SetGrid
