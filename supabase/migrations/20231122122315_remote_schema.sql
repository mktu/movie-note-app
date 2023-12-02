create table "public"."public-note" (
    "created_at" timestamp with time zone not null default now(),
    "note" text not null,
    "summary" text not null,
    "tmdb_id" text not null,
    "user_id" uuid not null
);


alter table "public"."public-note" enable row level security;

CREATE UNIQUE INDEX "public-note_pkey" ON public."public-note" USING btree (tmdb_id, user_id);

alter table "public"."public-note" add constraint "public-note_pkey" PRIMARY KEY using index "public-note_pkey";

create policy "Enable delete for users based on user_id"
on "public"."public-note"
as permissive
for delete
to authenticated
using ((auth.uid() = user_id));


create policy "Enable insert for authenticated users only"
on "public"."public-note"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."public-note"
as permissive
for select
to public
using (true);


create policy "Enable update for users based on email"
on "public"."public-note"
as permissive
for update
to authenticated
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));



