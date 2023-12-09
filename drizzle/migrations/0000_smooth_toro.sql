CREATE TABLE `flashcards` (
	`id` text(128) PRIMARY KEY NOT NULL,
	`term` text NOT NULL,
	`definition` text NOT NULL,
	`set_id` text(128),
	`user_id` text(128) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sets` (
	`id` text(128) PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`user_id` text(128) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text(128) PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`image` text
);
