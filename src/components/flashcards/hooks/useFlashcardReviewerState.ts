import { useReducer } from 'react'

type FlashcardState = {
	currentFlashcardIndex: number
	isDefinitionShown: boolean
	numberOfFlashcards: number
	isComplete: boolean
}

type FlashcardStateAction = {
	type:
		| 'PREVIOUS_FLASHCARD'
		| 'NEXT_FLASHCARD'
		| 'FLIP_FLASHCARD'
		| 'COMPLETE'
		| 'RESET'
}

const getInitialState = (numberOfFlashcards: number): FlashcardState => ({
	numberOfFlashcards,
	currentFlashcardIndex: 0,
	isDefinitionShown: false,
	isComplete: false,
})

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

		case action.type === 'COMPLETE':
			return {
				...state,
				isComplete: true,
			}

		case action.type === 'RESET':
			return getInitialState(state.numberOfFlashcards)

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
	const value = useReducer(
		flashcardStateReducer,
		getInitialState(numberOfFlashcards),
	)

	return value
}

export default useFlashcardReviewerState
