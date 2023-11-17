'use client'

import { ArrowLeftIcon, Cross1Icon } from '@radix-ui/react-icons'
import { Button } from '../primitives/Button'
import { Flashcard as FlashcardReviewer } from '@/lib/data-access/interfaces/IFlashCard'
import { useKey } from 'react-use'
import useFlashcardReviewerState from './hooks/useFlashcardReviewerState'
import Flashcard from './Flashcard'
import NextFlashcardButton from './NextFlashcardButton'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

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
	const router = useRouter()
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
	useKey('Escape', () => {
		if (document.activeElement?.tagName === 'BODY') {
			router.push(`/set/${setId}`)
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
			<div className="grid grid-cols-2 items-center p-8 md:grid-cols-3">
				<h1 className="text-lg font-medium md:col-start-2 md:text-center">
					{setName} Review
				</h1>
				<Link href={`/set/${setId}`} className="justify-self-end">
					<Button size="sm" variant="ghost">
						<Cross1Icon className="h-4 w-4" />
					</Button>
				</Link>
			</div>

			<div className="grow px-8 pb-24 md:max-h-[800px] md:px-16 md:py-32 lg:px-32">
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
