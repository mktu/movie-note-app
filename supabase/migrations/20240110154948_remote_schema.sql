alter table "public"."public-note" add column "view_id" uuid not null default gen_random_uuid();

CREATE UNIQUE INDEX "public-note_view_id_key" ON public."public-note" USING btree (view_id);

alter table "public"."public-note" add constraint "public-note_view_id_key" UNIQUE using index "public-note_view_id_key";


