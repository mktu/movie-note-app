create policy "Enable delete for users based on user_id"
on "public"."note_template"
as permissive
for delete
to public
using ((auth.uid() = user_id));


create policy "Enable insert for authenticated users only"
on "public"."note_template"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."note_template"
as permissive
for select
to public
using (((auth.uid() = user_id) OR (public = true)));



