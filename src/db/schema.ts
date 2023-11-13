import { pgTable, text, uuid } from 'drizzle-orm/pg-core'

export const set = pgTable('sets', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: text('name').notNull(),
	description: text('description'),
})

export const flashCards = pgTable('flash_cards', {
	id: uuid('id').primaryKey().defaultRandom(),
	term: text('term').notNull(),
	definition: text('definition').notNull(),
	setId: uuid('set_id').references(() => set.id),
})
