import { SetService } from '@/services'
import Set from './Set'

const SetListing = async () => {
	const sets = await SetService.cache.getAllSets()

	return (
		<div className="mb-4 flex flex-col gap-4">
			{sets.map((props) => (
				<Set key={props.id} {...props} />
			))}
		</div>
	)
}

export default SetListing
