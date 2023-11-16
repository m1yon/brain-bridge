export interface Flashcard {
	id: string
	term: string
	definition: string
}

export interface FlashcardOperations {
	createFlashcard(
		args: { setId: string } & Pick<Flashcard, 'term' | 'definition'>,
	): Promise<void>
	deleteFlashcard(args: Pick<Flashcard, 'id'>): Promise<void>
	updateFlashcard(
		args: Pick<Flashcard, 'id'> & Partial<Flashcard>,
	): Promise<void>
}
