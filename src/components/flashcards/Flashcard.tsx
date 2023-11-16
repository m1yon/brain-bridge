'use client'

import { cn } from '@/utils/cn'
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons'
import { Button } from '../primitives/Button'
import { Flashcard as FlashcardReviewer } from '@/lib/data-access/interfaces/IFlashCard'
import { useKey } from 'react-use'
import useFlashcardReviewerState from './hooks/useFlashcardReviewerState'

type FlashcardReviewerProps = { flashcards: FlashcardReviewer[] }

const FlashcardReviewer = ({ flashcards }: FlashcardReviewerProps) => {
	const [state, dispatch] = useFlashcardReviewerState({
		numberOfFlashcards: flashcards.length,
	})

	useKey('ArrowLeft', () => dispatch({ type: 'PREVIOUS_FLASHCARD' }))
	useKey('ArrowRight', () => dispatch({ type: 'NEXT_FLASHCARD' }))

	const currentFlashcard = flashcards[state.currentFlashcardIndex]

	return (
		<div>
			<div
				className="group h-96 cursor-pointer select-none perspective-1000"
				onClick={() => dispatch({ type: 'FLIP_FLASHCARD' })}
			>
				<div
					className={cn(
						'relative h-full w-full duration-200 transform-style-3d',
						state.isDefinitionShown && 'rotate-x-180',
					)}
				>
					<div className="absolute flex h-full w-full items-center justify-center bg-secondary text-2xl text-secondary-foreground backface-hidden">
						{currentFlashcard?.term}
					</div>
					<div className="absolute flex h-full w-full items-center justify-center overflow-hidden bg-secondary text-2xl text-secondary-foreground rotate-x-180 backface-hidden">
						{currentFlashcard?.definition}
					</div>
				</div>
			</div>

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
