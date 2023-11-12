import { pgTable, text, uuid } from 'drizzle-orm/pg-core'

export const flashCards = pgTable('flash_cards', {
	id: uuid('id').primaryKey(),
	term: text('term'),
	definition: text('definition'),
})
