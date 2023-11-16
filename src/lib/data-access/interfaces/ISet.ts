import { Flashcard } from './IFlashCard'

export interface Set {
	id: string
	name: string
	description: string | null
	flashcards: Flashcard[]
	flashcardCount: number
}

export interface SetOperations {
	getSet(id: string): Promise<Set | undefined>
	getAllSets(): Promise<Omit<Set, 'flashcards'>[]>
	createSet(
		args: Pick<Set, 'name' | 'description'> & {
			flashcards: Array<Pick<Flashcard, 'term' | 'definition'>>
		},
	): Promise<string>
	deleteSet(id: string): Promise<void>
	updateSet(
		args: Pick<Set, 'id' | 'name' | 'description'> & {
			flashcards: Array<Pick<Flashcard, 'id' | 'term' | 'definition'>>
		},
	): Promise<void>
}
