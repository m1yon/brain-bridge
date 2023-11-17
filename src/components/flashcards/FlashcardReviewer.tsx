'use client'

import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { Button } from '../primitives/Button'
import { Flashcard as FlashcardReviewer } from '@/lib/data-access/interfaces/IFlashCard'
import { useKey } from 'react-use'
import useFlashcardReviewerState from './hooks/useFlashcardReviewerState'
import Flashcard from './Flashcard'
import NextFlashcardButton from './NextFlashcardButton'
import Link from 'next/link'

type FlashcardReviewerProps = {
	setId: string
	setName: string
	flashcards: FlashcardReviewer[]
}

const FlashcardReviewer = ({
	setId,
	setName,
	flashcards,
}: FlashcardReviewerProps) => {
	const [state, dispatch] = useFlashcardReviewerState({
		numberOfFlashcards: flashcards.length,
	})
	const isLastCard =
		state.currentFlashcardIndex + 1 === state.numberOfFlashcards

	useKey('ArrowLeft', () => {
		if (document.activeElement?.tagName === 'BODY') {
			dispatch({ type: 'PREVIOUS_FLASHCARD' })
		}
	})
	useKey(
		'ArrowRight',
		() => {
			if (document.activeElement?.tagName === 'BODY') {
				dispatch({ type: isLastCard ? 'COMPLETE' : 'NEXT_FLASHCARD' })
			}
		},
		{},
		[isLastCard],
	)
	useKey(' ', () => {
		if (document.activeElement?.tagName === 'BODY') {
			dispatch({ type: 'FLIP_FLASHCARD' })
		}
	})

	const currentFlashcard = flashcards[state.currentFlashcardIndex]

	if (state.isComplete) {
		return (
			<div className="flex h-full flex-col items-center justify-center gap-4">
				<h1 className="text-4xl font-bold">
					You&apos;ve reviewed all the flashcards!
				</h1>
				<div className="flex gap-2">
					<Link href={`/set/${setId}`}>
						<Button>Done</Button>
					</Link>
					<Button
						variant="secondary"
						onClick={() => dispatch({ type: 'RESET' })}
					>
						Let&apos;s go again
					</Button>
				</div>
			</div>
		)
	}

	return (
		<div className="flex h-full flex-col">
			<h1 className="p-8 text-center">{setName} Review</h1>

			<div className="max-h-[800px] grow px-8 py-32 md:px-16 lg:px-32">
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

					<NextFlashcardButton
						key={currentFlashcard?.id}
						isLastCard={isLastCard}
						onClick={() => {
							dispatch({
								type: isLastCard ? 'COMPLETE' : 'NEXT_FLASHCARD',
							})
						}}
					/>
				</div>
			</div>
		</div>
	)
}

export default FlashcardReviewer
