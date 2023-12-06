import { relations } from 'drizzle-orm'
import { mysqlTable, text, char } from 'drizzle-orm/mysql-core'

export const sets = mysqlTable('sets', {
	id: char('id', { length: 128 }).primaryKey(),
	name: text('name').notNull(),
	description: text('description'),
	userId: char('user_id', { length: 128 }).notNull(),
})

export const flashcards = mysqlTable('flashcards', {
	id: char('id', { length: 128 }).primaryKey(),
	term: text('term').notNull(),
	definition: text('definition').notNull(),
	setId: char('set_id', { length: 128 }),
	userId: char('user_id', { length: 128 }).notNull(),
})

export const users = mysqlTable('users', {
	id: char('id', { length: 128 }).primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull(),
	image: text('image'),
})

export const setRelations = relations(sets, ({ many, one }) => ({
	flashcards: many(flashcards),
	userId: one(users, {
		fields: [sets.userId],
		references: [users.id],
	}),
}))

export const flashcardsRelations = relations(flashcards, ({ one }) => ({
	set: one(sets, {
		fields: [flashcards.setId],
		references: [sets.id],
	}),
	userId: one(users, {
		fields: [flashcards.userId],
		references: [users.id],
	}),
}))

export const usersRelations = relations(users, ({ many }) => ({
	sets: many(sets),
}))
