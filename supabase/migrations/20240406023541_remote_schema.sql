drop policy "Enable delete for users based on user_id" on "public"."movie_note";

drop policy "Enable update for users based on email" on "public"."movie_note";

drop policy "Enable delete for users based on user_id" on "public"."note_template";

drop policy "Enable read access for all users" on "public"."note_template";

drop policy "Enable update for users based on user_id" on "public"."note_template";

drop policy "Enable delete for users based on user_id" on "public"."public-note";

drop policy "Enable update for users based on email" on "public"."public-note";

drop view if exists "public"."movie_note_list_view";

alter table "public"."movie_note" alter column "user_id" set data type text using "user_id"::text;

alter table "public"."note_template" alter column "user_id" set data type text using "user_id"::text;

alter table "public"."public-note" alter column "user_id" set data type text using "user_id"::text;

create or replace view "public"."movie_note_list_view" as  SELECT mn.created_at,
    mn.tmdb_id,
    mn.user_id,
    mn.memo,
    mn.stars,
    mn.admiration_date,
    mn.lng,
    mn.updated_at,
    mn.watch_state,
    mn.html,
    mn.sort_index,
    mi.title,
    mi.thumbnail,
    mi.imdb_id
   FROM (movie_note mn
     JOIN movie_info mi ON (((mn.tmdb_id = mi.tmdb_id) AND (mn.lng = mi.lng))));


create policy "Enable delete for users based on user_id"
on "public"."movie_note"
as permissive
for delete
to authenticated
using (((auth.uid())::text = user_id));


create policy "Enable update for users based on email"
on "public"."movie_note"
as permissive
for update
to authenticated
using (((auth.uid())::text = user_id))
with check (((auth.uid())::text = user_id));


create policy "Enable delete for users based on user_id"
on "public"."note_template"
as permissive
for delete
to authenticated
using (((auth.uid())::text = user_id));


create policy "Enable read access for all users"
on "public"."note_template"
as permissive
for select
to public
using ((((auth.uid())::text = user_id) OR (public = true)));


create policy "Enable update for users based on user_id"
on "public"."note_template"
as permissive
for update
to authenticated
using (((auth.uid())::text = user_id))
with check (((auth.uid())::text = user_id));


create policy "Enable delete for users based on user_id"
on "public"."public-note"
as permissive
for delete
to authenticated
using (((auth.uid())::text = user_id));


create policy "Enable update for users based on email"
on "public"."public-note"
as permissive
for update
to authenticated
using (((auth.uid())::text = user_id))
with check (((auth.uid())::text = user_id));



