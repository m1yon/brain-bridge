import FlashCardCreationForm from '@/components/FlashCardCreationForm'
import FlashCardListing from '@/components/FlashCardListing'

export default function SetPage({ params }: { params: { setId: string } }) {
	return (
		<main className="mx-6 my-12">
			<h1 className="mb-6 text-3xl font-bold">Flash Cards</h1>
			<FlashCardListing setId={params.setId} />
			<FlashCardCreationForm />
		</main>
	)
}
