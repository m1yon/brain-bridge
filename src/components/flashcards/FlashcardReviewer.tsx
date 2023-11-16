'use client'

import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons'
import { Button } from '../primitives/Button'
import { Flashcard as FlashcardReviewer } from '@/lib/data-access/interfaces/IFlashCard'
import { useKey } from 'react-use'
import useFlashcardReviewerState from './hooks/useFlashcardReviewerState'
import Flashcard from './Flashcard'

type FlashcardReviewerProps = { flashcards: FlashcardReviewer[] }

const FlashcardReviewer = ({ flashcards }: FlashcardReviewerProps) => {
	const [state, dispatch] = useFlashcardReviewerState({
		numberOfFlashcards: flashcards.length,
	})

	useKey('ArrowLeft', () => {
		if (document.activeElement?.tagName === 'BODY') {
			dispatch({ type: 'PREVIOUS_FLASHCARD' })
		}
	})
	useKey('ArrowRight', () => {
		if (document.activeElement?.tagName === 'BODY') {
			dispatch({ type: 'NEXT_FLASHCARD' })
		}
	})
	useKey(' ', () => {
		if (document.activeElement?.tagName === 'BODY') {
			dispatch({ type: 'FLIP_FLASHCARD' })
		}
	})

	const currentFlashcard = flashcards[state.currentFlashcardIndex]

	return (
		<div>
			{currentFlashcard ? (
				<Flashcard
					key={currentFlashcard.id}
					term={currentFlashcard.term}
					definition={currentFlashcard.definition}
					isDefinitionShown={state.isDefinitionShown}
					onClick={() => dispatch({ type: 'FLIP_FLASHCARD' })}
				/>
			) : null}

			<div className="mt-4 flex justify-between">
				{state.currentFlashcardIndex !== 0 ? (
					<Button
						size="lg"
						variant="outline"
						onClick={() => {
							dispatch({ type: 'PREVIOUS_FLASHCARD' })
						}}
					>
						<ArrowLeftIcon className="h-7 w-7" />
					</Button>
				) : (
					<div />
				)}

				{state.currentFlashcardIndex !== flashcards.length - 1 ? (
					<Button
						size="lg"
						variant="outline"
						onClick={() => {
							dispatch({ type: 'NEXT_FLASHCARD' })
						}}
					>
						<ArrowRightIcon className="h-7 w-7" />
					</Button>
				) : null}
			</div>
		</div>
	)
}

export default FlashcardReviewer
