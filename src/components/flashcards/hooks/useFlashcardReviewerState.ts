import { useReducer } from 'react'

type FlashcardState = {
	currentFlashcardIndex: number
	isDefinitionShown: boolean
	numberOfFlashcards: number
}

type FlashcardStateAction = {
	type: 'PREVIOUS_FLASHCARD' | 'NEXT_FLASHCARD' | 'FLIP_FLASHCARD'
}

const flashcardStateReducer = (
	state: FlashcardState,
	action: FlashcardStateAction,
): FlashcardState => {
	switch (true) {
		case action.type === 'PREVIOUS_FLASHCARD':
			if (state.currentFlashcardIndex === 0) {
				return state
			}

			return {
				...state,
				currentFlashcardIndex: state.currentFlashcardIndex - 1,
				isDefinitionShown: false,
			}

		case action.type === 'NEXT_FLASHCARD':
			if (state.currentFlashcardIndex + 1 >= state.numberOfFlashcards) {
				return state
			}

			return {
				...state,
				currentFlashcardIndex: state.currentFlashcardIndex + 1,
				isDefinitionShown: false,
			}

		case action.type === 'FLIP_FLASHCARD':
			return {
				...state,
				isDefinitionShown: !state.isDefinitionShown,
			}

		default:
			return state
	}
}

type UseFlashcardReviewerStateArgs = {
	numberOfFlashcards: number
}

const useFlashcardReviewerState = ({
	numberOfFlashcards,
}: UseFlashcardReviewerStateArgs) => {
	const value = useReducer(flashcardStateReducer, {
		numberOfFlashcards,
		currentFlashcardIndex: 0,
		isDefinitionShown: false,
	})

	return value
}

export default useFlashcardReviewerState
