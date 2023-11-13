CREATE TABLE IF NOT EXISTS "sets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"description" text
);
--> statement-breakpoint
ALTER TABLE "flash_cards" ADD COLUMN "set_id" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "flash_cards" ADD CONSTRAINT "flash_cards_set_id_sets_id_fk" FOREIGN KEY ("set_id") REFERENCES "sets"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
