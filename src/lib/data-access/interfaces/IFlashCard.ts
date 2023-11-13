export interface FlashCard {
	id: string
	term: string
	definition: string
}

export interface FlashCardOperations {
	createFlashCard(
		args: { setId: string } & Pick<FlashCard, 'term' | 'definition'>,
	): Promise<void>
	deleteFlashCard(args: Pick<FlashCard, 'id'>): Promise<void>
	updateFlashCard(
		args: Pick<FlashCard, 'id'> & Partial<FlashCard>,
	): Promise<void>
}
