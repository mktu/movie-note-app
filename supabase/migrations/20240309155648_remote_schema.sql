set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.remove_users(target_email text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
-- 配列変数が使えない...
  delete from users where id in (
    select a.user_id from auth a join auth.users au on a.id = cast(au.id as text) where au.email = target_email
  );
  delete from auth where user_id in (
    select a.user_id from auth a join auth.users au on a.id = cast(au.id as text) where au.email = target_email
  );
  delete from auth.users where email = target_email;
end;
$function$
;


