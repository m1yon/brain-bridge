import { relations } from 'drizzle-orm'
import { mysqlTable, text, char } from 'drizzle-orm/mysql-core'

export const sets = mysqlTable('sets', {
	id: char('id', { length: 128 }).primaryKey(),
	name: text('name').notNull(),
	description: text('description'),
})

export const flashcards = mysqlTable('flashcards', {
	id: char('id', { length: 128 }).primaryKey(),
	term: text('term').notNull(),
	definition: text('definition').notNull(),
	setId: char('set_id', { length: 128 }),
})

export const setRelations = relations(sets, ({ many }) => ({
	flashcards: many(flashcards),
}))

export const flashcardsRelations = relations(flashcards, ({ one }) => ({
	set: one(sets, {
		fields: [flashcards.setId],
		references: [sets.id],
	}),
}))

export const users = mysqlTable('users', {
	id: char('id', { length: 128 }).primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull(),
	image: text('image'),
})
