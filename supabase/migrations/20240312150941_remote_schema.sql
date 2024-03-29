drop view if exists "public"."movie_note_list_view";

alter table "public"."movie_note" drop column "published";

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



