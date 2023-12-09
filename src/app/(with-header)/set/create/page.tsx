import { Button } from '@/components/primitives/Button'
import CreateUpdateSetForm from '@/components/sets/CreateUpdateSetForm'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
	title: 'Create New Set - Brain Bridge',
	description: 'Create a new set.',
}

const CreateSet = () => {
	return (
		<main className="mx-6 my-8">
			<Link href="/">
				<Button variant="link" className="pl-0">
					<ArrowLeftIcon className="mr-1 inline" />
					Back
				</Button>
			</Link>
			<h1 className="mb-6 text-4xl font-bold">Create New Set</h1>
			<CreateUpdateSetForm />
		</main>
	)
}

export default CreateSet
