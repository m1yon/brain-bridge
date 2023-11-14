import { FlashCard } from './IFlashCard'

export interface Set {
	id: string
	name: string
	description: string | null
	flashCards: FlashCard[]
	flashCardCount: number
}

export interface SetOperations {
	getSet(id: string): Promise<Set | undefined>
	getAllSets(): Promise<Omit<Set, 'flashCards'>[]>
	createSet(
		args: Pick<Set, 'name' | 'description'> & {
			flashCards: Array<Pick<FlashCard, 'term' | 'definition'>>
		},
	): Promise<string>
	deleteSet(id: string): Promise<void>
}
