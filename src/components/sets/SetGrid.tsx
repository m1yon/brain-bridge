import { SetService } from '@/lib/data-access'
import Set from './Set'
import { Button } from '../primitives/Button'
import { PlusIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { unstable_cache } from 'next/cache'
import { AuthService } from '@/lib/auth'

const SetGrid = async () => {
	const session = await AuthService.getSession()
	const getSetsCached = unstable_cache(
		async () => SetService.getSets(),
		[`get-sets-${session.user.id}`],
		{
			tags: [`get-sets-${session.user.id}`],
		},
	)
	const sets = await getSetsCached()

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
