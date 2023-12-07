import { Flashcard } from './IFlashCard'

export interface Set {
	id: string
	name: string
	description?: string
	flashcards: Flashcard[]
	flashcardCount: number
	userId: string
}

export interface SetOperations {
	createSet(
		args: Pick<Set, 'name' | 'description'> & {
			flashcards: Array<Pick<Flashcard, 'term' | 'definition'>>
		},
	): Promise<{ id: string }>
	getSet(args: { id: string }): Promise<Set | undefined>
	getAllSets(): Promise<Omit<Set, 'flashcards'>[]>
	updateSet(
		args: Pick<Set, 'id' | 'name' | 'description'> & {
			flashcards: Array<Pick<Flashcard, 'id' | 'term' | 'definition'>>
		},
	): Promise<{ success: boolean; error?: Error }>
	deleteSet(args: { id: string }): Promise<{ success: boolean; error?: Error }>
}
