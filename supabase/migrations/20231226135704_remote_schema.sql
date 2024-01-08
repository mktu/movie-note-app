alter table "public"."note_template" add column "updated_at" timestamp with time zone default now();

CREATE TRIGGER handle_updated_at_note_template BEFORE UPDATE ON public.note_template FOR EACH ROW EXECUTE FUNCTION moddatetime('updated_at');


