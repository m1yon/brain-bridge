import SetCreationForm from '@/components/SetCreationForm'
import SetListing from '@/components/SetListing'

export default function Home() {
	return (
		<main className="mx-6 my-12">
			<h1 className="mb-6 text-3xl font-bold">Sets</h1>
			<SetListing />
			<SetCreationForm />
		</main>
	)
}
