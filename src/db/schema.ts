import { relations } from 'drizzle-orm'
import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const sets = sqliteTable('sets', {
	id: text('id', { length: 128 }).primaryKey(),
	name: text('name').notNull(),
	description: text('description'),
	userId: text('user_id', { length: 128 }).notNull(),
})

export const flashcards = sqliteTable('flashcards', {
	id: text('id', { length: 128 }).primaryKey(),
	term: text('term').notNull(),
	definition: text('definition').notNull(),
	setId: text('set_id', { length: 128 }),
	userId: text('user_id', { length: 128 }).notNull(),
})

export const users = sqliteTable('users', {
	id: text('id', { length: 128 }).primaryKey(),
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
