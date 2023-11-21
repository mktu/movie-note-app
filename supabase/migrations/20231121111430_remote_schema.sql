drop view if exists "public"."movie_note_list_view";

alter table "public"."movie_info" enable row level security;

alter table "public"."movie_note" enable row level security;

create or replace view "public"."movie_note_list_view" as  SELECT mn.created_at,
    mn.tmdb_id,
    mn.user_id,
    mn.memo,
    mn.stars,
    mn.admiration_date,
    mn.lng,
    mn.updated_at,
    mn.watch_state,
    mn.published,
    mn.html,
    mi.title,
    mi.thumbnail,
    mi.imdb_id
   FROM (movie_note mn
     JOIN movie_info mi ON (((mn.tmdb_id = mi.tmdb_id) AND (mn.lng = mi.lng))));


create policy "Enable insert for authenticated users only"
on "public"."movie_info"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."movie_info"
as permissive
for select
to public
using (true);


create policy "Enable delete for users based on user_id"
on "public"."movie_note"
as permissive
for delete
to public
using ((auth.uid() = user_id));


create policy "Enable insert for authenticated users only"
on "public"."movie_note"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."movie_note"
as permissive
for select
to public
using (true);


create policy "Enable update for users based on email"
on "public"."movie_note"
as permissive
for update
to authenticated
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));


create policy "Enable update for users based on user_id"
on "public"."note_template"
as permissive
for update
to authenticated
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));



