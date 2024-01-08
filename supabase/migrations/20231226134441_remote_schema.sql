drop trigger if exists "handle_updated_at_public_note" on "public"."public-note";

CREATE TRIGGER handle_updated_at_public_note BEFORE UPDATE ON public."public-note" FOR EACH ROW EXECUTE FUNCTION moddatetime('updated_at');


