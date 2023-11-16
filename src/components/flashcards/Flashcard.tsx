'use client'

import { cn } from '@/utils/cn'
import { useState } from 'react'
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons'
import { Button } from '../primitives/Button'
import { Flashcard } from '@/lib/data-access/interfaces/IFlashCard'

type FlashcardProps = { flashcards: Flashcard[] }

const Flashcard = ({ flashcards }: FlashcardProps) => {
	const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0)
	const [isDefinitionShown, setIsDefinitionShown] = useState(false)

	const currentFlashcard = flashcards[currentFlashcardIndex]

	return (
		<div>
			<div
				className="group h-96 cursor-pointer select-none perspective-1000"
				onClick={() => setIsDefinitionShown(!isDefinitionShown)}
			>
				<div
					className={cn(
						'relative h-full w-full duration-200 transform-style-3d',
						isDefinitionShown && 'rotate-x-180',
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
				{currentFlashcardIndex !== 0 ? (
					<Button
						size="lg"
						variant="outline"
						onClick={() => {
							setCurrentFlashcardIndex(currentFlashcardIndex - 1)
							setIsDefinitionShown(false)
						}}
					>
						<ArrowLeftIcon className="h-7 w-7" />
					</Button>
				) : (
					<div />
				)}

				{currentFlashcardIndex !== flashcards.length - 1 ? (
					<Button
						size="lg"
						variant="outline"
						onClick={() => {
							setCurrentFlashcardIndex(currentFlashcardIndex + 1)
							setIsDefinitionShown(false)
						}}
					>
						<ArrowRightIcon className="h-7 w-7" />
					</Button>
				) : null}
			</div>
		</div>
	)
}

export default Flashcard
