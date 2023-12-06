export interface Flashcard {
	id: string
	term: string
	definition: string
}

export interface FlashcardOperations {
	createFlashcard(
		args: { setId: string } & Pick<Flashcard, 'term' | 'definition'>,
	): Promise<{ id: string }>
	updateFlashcard(
		args: Pick<Flashcard, 'id'> & Partial<Flashcard>,
	): Promise<{ success: boolean; error?: Error }>
	deleteFlashcard(
		args: Pick<Flashcard, 'id'>,
	): Promise<{ success: boolean; error?: Error }>
}
