import { relations } from 'drizzle-orm'
import { pgTable, text, uuid } from 'drizzle-orm/pg-core'

export const sets = pgTable('sets', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: text('name').notNull(),
	description: text('description'),
})

export const flashCards = pgTable('flash_cards', {
	id: uuid('id').primaryKey().defaultRandom(),
	term: text('term').notNull(),
	definition: text('definition').notNull(),
	setId: uuid('set_id').references(() => sets.id),
})

export const setRelations = relations(sets, ({ many }) => ({
	flashCards: many(flashCards),
}))

export const flashCardsRelations = relations(flashCards, ({ one }) => ({
	set: one(sets, {
		fields: [flashCards.setId],
		references: [sets.id],
	}),
}))
