
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

CREATE SCHEMA IF NOT EXISTS "public";

ALTER SCHEMA "public" OWNER TO "postgres";

COMMENT ON SCHEMA "public" IS 'standard public schema';

CREATE EXTENSION IF NOT EXISTS "moddatetime" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE OR REPLACE FUNCTION "public"."add_user"("id" "uuid", "name" "text") RETURNS integer
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
declare
  user_id uuid;
begin
  insert into users(id,name)
  values (id, name) returning id into user_id;

  insert into auth(id, user_id)
  values (user_id, user_id);

  return 1;
end;
$$;

ALTER FUNCTION "public"."add_user"("id" "uuid", "name" "text") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."add_user"("id" "uuid", "name" "text", "auth_id" "text") RETURNS integer
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
declare
  user_id uuid;
begin
  insert into users(id,name)
  values (add_user.id, add_user.name) returning users.id into user_id;

  insert into auth(id, user_id)
  values (add_user.auth_id, user_id);

  return 1;
end;
$$;

ALTER FUNCTION "public"."add_user"("id" "uuid", "name" "text", "auth_id" "text") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."add_user"("id" "uuid", "name" "text", "auth_id" "text", "comment" "text") RETURNS integer
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
declare
  user_id uuid;
begin
  insert into users(id,name,comment)
  values (add_user.id, add_user.name, add_user.comment) returning users.id into user_id;

  insert into auth(id, user_id)
  values (add_user.auth_id, user_id);

  return 1;
end;
$$;

ALTER FUNCTION "public"."add_user"("id" "uuid", "name" "text", "auth_id" "text", "comment" "text") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."is_user_exists"("target_email" "text") RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
declare
  user_cnt integer;
begin
  select count(*) from auth.users where email = target_email limit 1 into user_cnt;

  return user_cnt > 0;
end;
$$;

ALTER FUNCTION "public"."is_user_exists"("target_email" "text") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."pgrst_watch"() RETURNS "event_trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  NOTIFY pgrst, 'reload schema';
END;
$$;

ALTER FUNCTION "public"."pgrst_watch"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."remove_users"("target_email" "text") RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
begin
  delete from users where id in (
    select a.user_id from auth a join auth.users au on a.id = cast(au.id as text) where au.email = target_email
  );
  delete from auth where user_id in (
    select a.user_id from auth a join auth.users au on a.id = cast(au.id as text) where au.email = target_email
  );
  delete from auth.users where email = target_email;
end;
$$;

ALTER FUNCTION "public"."remove_users"("target_email" "text") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."update_user"("auth_id" "text", "name" "text", "comment" "text") RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
begin
  UPDATE users SET
  name=update_user.name,
  comment=update_user.comment
  FROM auth
  WHERE users.id=auth.user_id AND auth.id=auth_id;
end;
$$;

ALTER FUNCTION "public"."update_user"("auth_id" "text", "name" "text", "comment" "text") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."update_user"("auth_id" "text", "name" "text", "comment" "text", "image" "text") RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
begin
  UPDATE users SET
  name=update_user.name,
  comment=update_user.comment,
  image=update_user.image
  FROM auth
  WHERE users.id=auth.user_id AND auth.id=auth_id;
end;
$$;

ALTER FUNCTION "public"."update_user"("auth_id" "text", "name" "text", "comment" "text", "image" "text") OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."auth" (
    "id" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "user_id" "uuid" NOT NULL
);

ALTER TABLE "public"."auth" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."movie_info" (
    "created_at" timestamp with time zone DEFAULT "now"(),
    "title" character varying,
    "tmdb_id" "text" NOT NULL,
    "thumbnail" "text",
    "lng" "text" NOT NULL,
    "imdb_id" "text"
);

ALTER TABLE "public"."movie_info" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."movie_note" (
    "created_at" timestamp with time zone DEFAULT "now"(),
    "tmdb_id" "text" NOT NULL,
    "user_id" "uuid" NOT NULL,
    "memo" "text",
    "stars" real,
    "admiration_date" "date",
    "lng" "text" NOT NULL,
    "updated_at" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc'::"text"),
    "watch_state" "text",
    "html" "text",
    "published" boolean,
    "sort_index" bigint DEFAULT '0'::bigint
);

ALTER TABLE "public"."movie_note" OWNER TO "postgres";

CREATE OR REPLACE VIEW "public"."movie_note_list_view" AS
 SELECT "mn"."created_at",
    "mn"."tmdb_id",
    "mn"."user_id",
    "mn"."memo",
    "mn"."stars",
    "mn"."admiration_date",
    "mn"."lng",
    "mn"."updated_at",
    "mn"."watch_state",
    "mn"."published",
    "mn"."html",
    "mn"."sort_index",
    "mi"."title",
    "mi"."thumbnail",
    "mi"."imdb_id"
   FROM ("public"."movie_note" "mn"
     JOIN "public"."movie_info" "mi" ON ((("mn"."tmdb_id" = "mi"."tmdb_id") AND ("mn"."lng" = "mi"."lng"))));

ALTER TABLE "public"."movie_note_list_view" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."note_template" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "template" "text",
    "public" boolean,
    "user_id" "uuid",
    "name" "text" NOT NULL,
    "html" "text",
    "updated_at" timestamp with time zone DEFAULT "now"()
);

ALTER TABLE "public"."note_template" OWNER TO "postgres";

ALTER TABLE "public"."note_template" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."note_template_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."public-note" (
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "note" "text" NOT NULL,
    "summary" "text" NOT NULL,
    "tmdb_id" "text" NOT NULL,
    "user_id" "uuid" NOT NULL,
    "public" boolean NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "view_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL
);

ALTER TABLE "public"."public-note" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."user_settings" (
    "created_at" timestamp with time zone DEFAULT "now"(),
    "key" "text",
    "value" "text",
    "user_id" "uuid" NOT NULL
);

ALTER TABLE "public"."user_settings" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."users" (
    "id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "name" "text",
    "image" "text",
    "comment" "text"
);

ALTER TABLE "public"."users" OWNER TO "postgres";

CREATE OR REPLACE VIEW "public"."users_view" AS
 SELECT "u"."id",
    "u"."created_at",
    "u"."name",
    "u"."image",
    "u"."comment",
    "a"."id" AS "auth_id"
   FROM ("public"."users" "u"
     LEFT JOIN "public"."auth" "a" ON (("u"."id" = "a"."user_id")));

ALTER TABLE "public"."users_view" OWNER TO "postgres";

ALTER TABLE ONLY "public"."auth"
    ADD CONSTRAINT "auth_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."movie_info"
    ADD CONSTRAINT "movie_info_pkey" PRIMARY KEY ("tmdb_id", "lng");

ALTER TABLE ONLY "public"."movie_note"
    ADD CONSTRAINT "movie_note_pkey" PRIMARY KEY ("tmdb_id", "user_id");

ALTER TABLE ONLY "public"."note_template"
    ADD CONSTRAINT "note_template_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."public-note"
    ADD CONSTRAINT "public-note_pkey" PRIMARY KEY ("tmdb_id", "user_id");

ALTER TABLE ONLY "public"."public-note"
    ADD CONSTRAINT "public-note_view_id_key" UNIQUE ("view_id");

ALTER TABLE ONLY "public"."user_settings"
    ADD CONSTRAINT "user_settings_pkey" PRIMARY KEY ("user_id");

ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

CREATE OR REPLACE TRIGGER "handle_updated_at" BEFORE UPDATE ON "public"."movie_note" FOR EACH ROW EXECUTE FUNCTION "extensions"."moddatetime"('updated_at');

CREATE OR REPLACE TRIGGER "handle_updated_at_note_template" BEFORE UPDATE ON "public"."note_template" FOR EACH ROW EXECUTE FUNCTION "extensions"."moddatetime"('updated_at');

CREATE OR REPLACE TRIGGER "handle_updated_at_public_note" BEFORE UPDATE ON "public"."public-note" FOR EACH ROW EXECUTE FUNCTION "extensions"."moddatetime"('updated_at');

CREATE POLICY "Enable delete for users based on user_id" ON "public"."movie_note" FOR DELETE USING (("auth"."uid"() = "user_id"));

CREATE POLICY "Enable delete for users based on user_id" ON "public"."note_template" FOR DELETE USING (("auth"."uid"() = "user_id"));

CREATE POLICY "Enable delete for users based on user_id" ON "public"."public-note" FOR DELETE TO "authenticated" USING (("auth"."uid"() = "user_id"));

CREATE POLICY "Enable insert for authenticated users only" ON "public"."movie_info" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."movie_note" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."note_template" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."public-note" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON "public"."auth" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."movie_info" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."movie_note" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."note_template" FOR SELECT USING ((("auth"."uid"() = "user_id") OR ("public" = true)));

CREATE POLICY "Enable read access for all users" ON "public"."public-note" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."users" FOR SELECT USING (true);

CREATE POLICY "Enable update for users based on email" ON "public"."movie_note" FOR UPDATE TO "authenticated" USING (("auth"."uid"() = "user_id")) WITH CHECK (("auth"."uid"() = "user_id"));

CREATE POLICY "Enable update for users based on email" ON "public"."public-note" FOR UPDATE TO "authenticated" USING (("auth"."uid"() = "user_id")) WITH CHECK (("auth"."uid"() = "user_id"));

CREATE POLICY "Enable update for users based on user_id" ON "public"."note_template" FOR UPDATE TO "authenticated" USING (("auth"."uid"() = "user_id")) WITH CHECK (("auth"."uid"() = "user_id"));

ALTER TABLE "public"."auth" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."movie_info" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."movie_note" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."note_template" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."public-note" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."user_settings" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."users" ENABLE ROW LEVEL SECURITY;

REVOKE USAGE ON SCHEMA "public" FROM PUBLIC;
GRANT ALL ON SCHEMA "public" TO PUBLIC;
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON FUNCTION "public"."add_user"("id" "uuid", "name" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."add_user"("id" "uuid", "name" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."add_user"("id" "uuid", "name" "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."add_user"("id" "uuid", "name" "text", "auth_id" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."add_user"("id" "uuid", "name" "text", "auth_id" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."add_user"("id" "uuid", "name" "text", "auth_id" "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."add_user"("id" "uuid", "name" "text", "auth_id" "text", "comment" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."add_user"("id" "uuid", "name" "text", "auth_id" "text", "comment" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."add_user"("id" "uuid", "name" "text", "auth_id" "text", "comment" "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."is_user_exists"("target_email" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."is_user_exists"("target_email" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_user_exists"("target_email" "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgrst_watch"() TO "anon";
GRANT ALL ON FUNCTION "public"."pgrst_watch"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgrst_watch"() TO "service_role";

GRANT ALL ON FUNCTION "public"."remove_users"("target_email" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."remove_users"("target_email" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."remove_users"("target_email" "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."update_user"("auth_id" "text", "name" "text", "comment" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."update_user"("auth_id" "text", "name" "text", "comment" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_user"("auth_id" "text", "name" "text", "comment" "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."update_user"("auth_id" "text", "name" "text", "comment" "text", "image" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."update_user"("auth_id" "text", "name" "text", "comment" "text", "image" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_user"("auth_id" "text", "name" "text", "comment" "text", "image" "text") TO "service_role";

GRANT ALL ON TABLE "public"."auth" TO "anon";
GRANT ALL ON TABLE "public"."auth" TO "authenticated";
GRANT ALL ON TABLE "public"."auth" TO "service_role";

GRANT ALL ON TABLE "public"."movie_info" TO "anon";
GRANT ALL ON TABLE "public"."movie_info" TO "authenticated";
GRANT ALL ON TABLE "public"."movie_info" TO "service_role";

GRANT ALL ON TABLE "public"."movie_note" TO "anon";
GRANT ALL ON TABLE "public"."movie_note" TO "authenticated";
GRANT ALL ON TABLE "public"."movie_note" TO "service_role";

GRANT ALL ON TABLE "public"."movie_note_list_view" TO "anon";
GRANT ALL ON TABLE "public"."movie_note_list_view" TO "authenticated";
GRANT ALL ON TABLE "public"."movie_note_list_view" TO "service_role";

GRANT ALL ON TABLE "public"."note_template" TO "anon";
GRANT ALL ON TABLE "public"."note_template" TO "authenticated";
GRANT ALL ON TABLE "public"."note_template" TO "service_role";

GRANT ALL ON SEQUENCE "public"."note_template_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."note_template_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."note_template_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."public-note" TO "anon";
GRANT ALL ON TABLE "public"."public-note" TO "authenticated";
GRANT ALL ON TABLE "public"."public-note" TO "service_role";

GRANT ALL ON TABLE "public"."user_settings" TO "anon";
GRANT ALL ON TABLE "public"."user_settings" TO "authenticated";
GRANT ALL ON TABLE "public"."user_settings" TO "service_role";

GRANT ALL ON TABLE "public"."users" TO "anon";
GRANT ALL ON TABLE "public"."users" TO "authenticated";
GRANT ALL ON TABLE "public"."users" TO "service_role";

GRANT ALL ON TABLE "public"."users_view" TO "anon";
GRANT ALL ON TABLE "public"."users_view" TO "authenticated";
GRANT ALL ON TABLE "public"."users_view" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
