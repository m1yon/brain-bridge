export interface Set {
	id: string
	name: string
	description: string | null
}

export interface SetOperations {
	getAllSets(): Promise<Set[]>
	createSet(args: Pick<Set, 'name' | 'description'>): Promise<void>
}
