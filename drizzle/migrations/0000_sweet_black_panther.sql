CREATE TABLE IF NOT EXISTS "flashcards" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"term" text NOT NULL,
	"definition" text NOT NULL,
	"set_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"image" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "flashcards" ADD CONSTRAINT "flashcards_set_id_sets_id_fk" FOREIGN KEY ("set_id") REFERENCES "sets"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
