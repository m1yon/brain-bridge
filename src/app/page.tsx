import FlashCardCreationForm from '@/components/FlashCardCreationForm'
import FlashCardListing from '@/components/FlashCardListing'

export default function Home() {
	return (
		<main className="m-8">
			<FlashCardCreationForm />
			<FlashCardListing />
		</main>
	)
}
