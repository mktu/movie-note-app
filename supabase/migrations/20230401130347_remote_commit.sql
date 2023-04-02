alter table "public"."user_settings" drop constraint "user_settings_pkey";

drop index if exists "public"."user_settings_pkey";

alter table "public"."user_settings" drop column "id";

alter table "public"."user_settings" add column "user_id" uuid not null;

CREATE UNIQUE INDEX user_settings_pkey ON public.user_settings USING btree (user_id);

alter table "public"."user_settings" add constraint "user_settings_pkey" PRIMARY KEY using index "user_settings_pkey";


