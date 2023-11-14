import CreateUpdateSetForm from '@/components/sets/CreateUpdateSetForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Create New Set - Brain Bridge',
	description: 'Create a new set.',
}

export default function CreateSet() {
	return (
		<main className="mx-6 my-12">
			<h1 className="mb-6 text-4xl font-bold">Create New Set</h1>
			<CreateUpdateSetForm />
		</main>
	)
}
