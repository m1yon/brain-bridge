import FlashCardCreationForm from '@/components/FlashCardCreationForm'
import FlashCardListing from '@/components/FlashCardListing'

export default function SetPage() {
	return (
		<>
			<h1 className="mb-6 text-3xl font-bold">Flash Cards</h1>
			<FlashCardListing />
			<FlashCardCreationForm />
		</>
	)
}
