import { ArrowRightIcon, CheckIcon } from '@radix-ui/react-icons'
import { Button } from '../primitives/Button'

type NextFlashcardButtonProps = {
	isLastCard: boolean
	onClick: () => void
}

const NextFlashcardButton = ({
	isLastCard,
	onClick,
}: NextFlashcardButtonProps) => {
	if (isLastCard) {
		return (
			<Button size="lg" variant="default" onClick={onClick}>
				<CheckIcon className="h-7 w-7" />
			</Button>
		)
	}

	return (
		<Button size="lg" variant="outline" onClick={onClick}>
			<ArrowRightIcon className="h-7 w-7" />
		</Button>
	)
}

export default NextFlashcardButton
