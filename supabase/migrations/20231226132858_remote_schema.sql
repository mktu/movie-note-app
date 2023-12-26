alter table "public"."public-note" add column "updated_at" timestamp with time zone default now();

CREATE TRIGGER handle_updated_at_public_note BEFORE UPDATE ON public."public-note" FOR EACH ROW EXECUTE FUNCTION moddatetime();


