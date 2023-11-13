import { SetService } from '@/services'
import Set from './Set'
import SetCreationDialog from './SetCreationDialog'

const SetListing = async () => {
	const sets = await SetService.cache.getAllSets()

	return (
		<div className="mb-4 grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			{sets.map((props) => (
				<Set key={props.id} {...props} />
			))}
			<SetCreationDialog />
		</div>
	)
}

export default SetListing
