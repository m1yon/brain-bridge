import SetCreationForm from '@/components/SetCreationForm'
import SetListing from '@/components/SetListing'

export default function Home() {
	return (
		<main className="mx-6 my-12">
			<SetListing />
			<SetCreationForm />
		</main>
	)
}
