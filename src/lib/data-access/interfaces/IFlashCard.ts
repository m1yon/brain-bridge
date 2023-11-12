export interface FlashCard {
	id: string
	term: string
	definition: string
}

export interface FlashCardOperations {
	getAllFlashCards(): Promise<FlashCard[]>
	createFlashCard(args: Pick<FlashCard, 'term' | 'definition'>): Promise<void>
}
