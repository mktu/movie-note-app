--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Debian 14.5-1.pgdg110+1)
-- Dumped by pg_dump version 14.5 (Homebrew)

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

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'b5f2343d-d2fa-4e38-a548-3d01f0376809', '{"action":"user_signedup","actor_id":"fdc7fdd2-029d-4151-ab90-5450fa85409c","actor_username":"example@test.gmail.com","log_type":"team","traits":{"provider":"email"}}', '2022-10-30 12:12:30.188834+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', '7dcffb8a-a48b-40e2-91d1-567ff26f13af', '{"action":"login","actor_id":"fdc7fdd2-029d-4151-ab90-5450fa85409c","actor_username":"example@test.gmail.com","log_type":"account","traits":{"provider":"email"}}', '2022-10-30 12:12:30.191094+00', '');


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at) VALUES ('00000000-0000-0000-0000-000000000000', 'fdc7fdd2-029d-4151-ab90-5450fa85409c', 'authenticated', 'authenticated', 'example@test.gmail.com', '$2a$10$k7Vm5Fz1tUN6X/GxOQlTNeMQV1SGyiUrYv2jfjGDmeSsOSPDuxMBW', '2022-10-30 12:12:30.189777+00', NULL, '', NULL, '', NULL, '', '', NULL, '2022-10-30 12:12:30.191675+00', '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2022-10-30 12:12:30.182317+00', '2022-10-30 12:12:30.194362+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO auth.identities (id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at) VALUES ('fdc7fdd2-029d-4151-ab90-5450fa85409c', 'fdc7fdd2-029d-4151-ab90-5450fa85409c', '{"sub": "fdc7fdd2-029d-4151-ab90-5450fa85409c"}', 'email', '2022-10-30 12:12:30.187575+00', '2022-10-30 12:12:30.187615+00', '2022-10-30 12:12:30.187617+00');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO auth.sessions (id, user_id, created_at, updated_at) VALUES ('c55dce17-66e5-46b0-b451-512e7d458cce', 'fdc7fdd2-029d-4151-ab90-5450fa85409c', '2022-10-30 12:12:30.191694+00', '2022-10-30 12:12:30.191695+00');


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) VALUES ('00000000-0000-0000-0000-000000000000', 1, 'fEl86ZTjs6-7lF4N7S6oWQ', 'fdc7fdd2-029d-4151-ab90-5450fa85409c', false, '2022-10-30 12:12:30.192483+00', '2022-10-30 12:12:30.192484+00', NULL, 'c55dce17-66e5-46b0-b451-512e7d458cce');


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO auth.schema_migrations (version) VALUES ('20171026211738');
INSERT INTO auth.schema_migrations (version) VALUES ('20171026211808');
INSERT INTO auth.schema_migrations (version) VALUES ('20171026211834');
INSERT INTO auth.schema_migrations (version) VALUES ('20180103212743');
INSERT INTO auth.schema_migrations (version) VALUES ('20180108183307');
INSERT INTO auth.schema_migrations (version) VALUES ('20180119214651');
INSERT INTO auth.schema_migrations (version) VALUES ('20180125194653');
INSERT INTO auth.schema_migrations (version) VALUES ('00');
INSERT INTO auth.schema_migrations (version) VALUES ('20210710035447');
INSERT INTO auth.schema_migrations (version) VALUES ('20210722035447');
INSERT INTO auth.schema_migrations (version) VALUES ('20210730183235');
INSERT INTO auth.schema_migrations (version) VALUES ('20210909172000');
INSERT INTO auth.schema_migrations (version) VALUES ('20210927181326');
INSERT INTO auth.schema_migrations (version) VALUES ('20211122151130');
INSERT INTO auth.schema_migrations (version) VALUES ('20211124214934');
INSERT INTO auth.schema_migrations (version) VALUES ('20211202183645');
INSERT INTO auth.schema_migrations (version) VALUES ('20220114185221');
INSERT INTO auth.schema_migrations (version) VALUES ('20220114185340');
INSERT INTO auth.schema_migrations (version) VALUES ('20220224000811');
INSERT INTO auth.schema_migrations (version) VALUES ('20220323170000');
INSERT INTO auth.schema_migrations (version) VALUES ('20220429102000');
INSERT INTO auth.schema_migrations (version) VALUES ('20220531120530');
INSERT INTO auth.schema_migrations (version) VALUES ('20220614074223');
INSERT INTO auth.schema_migrations (version) VALUES ('20220811173540');


--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: postgres
--

INSERT INTO pgsodium.key (id, status, created, expires, key_type, key_id, key_context, comment, user_data) VALUES ('fd82cead-e34d-48b5-9512-50911a9cf4ed', 'default', '2022-10-30 12:12:04.021009', NULL, NULL, 1, '\x7067736f6469756d', 'This is the default key used for vault.secrets', NULL);


--
-- Data for Name: auth; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

INSERT INTO public.auth (id, created_at, user_id) VALUES ('fdc7fdd2-029d-4151-ab90-5450fa85409c', '2022-10-30 12:12:40.38436+00', 'a33c3240-0816-4a60-aa18-d7988c3cda33');


--
-- Data for Name: movie_info; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--



--
-- Data for Name: movie_note; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

INSERT INTO public.users (id, created_at, name, image, comment) VALUES ('a33c3240-0816-4a60-aa18-d7988c3cda33', '2022-10-30 12:12:40.38436+00', 'Test User', NULL, '');


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES (20211116024918, '2022-04-14 09:42:55');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES (20211116045059, '2022-04-14 09:42:55');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES (20211116050929, '2022-04-14 09:42:55');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES (20211116051442, '2022-04-14 09:42:55');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES (20211116212300, '2022-04-14 09:42:55');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES (20211116213355, '2022-04-14 09:42:55');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES (20211116213934, '2022-04-14 09:42:55');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES (20211116214523, '2022-04-14 09:42:55');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES (20211122062447, '2022-04-14 09:42:55');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES (20211124070109, '2022-04-14 09:42:55');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES (20211202204204, '2022-04-14 09:42:55');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES (20211202204605, '2022-04-14 09:42:55');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES (20211210212804, '2022-04-14 09:42:56');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES (20211228014915, '2022-04-14 09:42:56');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES (20220107221237, '2022-04-14 09:42:56');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES (20220228202821, '2022-04-14 09:42:56');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES (20220312004840, '2022-04-14 09:42:56');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES (20220603231003, '2022-08-23 04:55:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES (20220603232444, '2022-08-23 04:55:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES (20220615214548, '2022-08-23 04:55:52');
INSERT INTO realtime.schema_migrations (version, inserted_at) VALUES (20220712093339, '2022-08-23 04:55:52');


--
-- Data for Name: subscription; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--



--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: migrations; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES (0, 'create-migrations-table', 'e18db593bcde2aca2a408c4d1100f6abba2195df', '2022-04-14 09:42:54.573289');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES (1, 'initialmigration', '6ab16121fbaa08bbd11b712d05f358f9b555d777', '2022-04-14 09:42:54.630614');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES (2, 'pathtoken-column', '49756be03be4c17bb85fe70d4a861f27de7e49ad', '2022-04-14 09:42:54.676128');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES (3, 'add-migrations-rls', 'bb5d124c53d68635a883e399426c6a5a25fc893d', '2022-04-14 09:42:55.036044');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES (4, 'add-size-functions', '6d79007d04f5acd288c9c250c42d2d5fd286c54d', '2022-04-14 09:42:55.072341');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES (5, 'change-column-name-in-get-size', 'fd65688505d2ffa9fbdc58a944348dd8604d688c', '2022-04-14 09:42:55.102122');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES (6, 'add-rls-to-buckets', '63e2bab75a2040fee8e3fb3f15a0d26f3380e9b6', '2022-04-14 09:42:55.139121');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES (7, 'add-public-to-buckets', '82568934f8a4d9e0a85f126f6fb483ad8214c418', '2022-04-14 09:42:55.179168');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES (8, 'fix-search-function', '1a43a40eddb525f2e2f26efd709e6c06e58e059c', '2022-04-14 09:42:55.218331');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES (9, 'search-files-search-function', '34c096597eb8b9d077fdfdde9878c88501b2fafc', '2022-08-23 04:56:00.165176');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES (10, 'add-trigger-to-auto-update-updated_at-column', '37d6bb964a70a822e6d37f22f457b9bca7885928', '2022-08-23 04:56:00.176673');


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('auth.refresh_tokens_id_seq', 1, true);


--
-- Name: subscription_id_seq; Type: SEQUENCE SET; Schema: realtime; Owner: supabase_admin
--

SELECT pg_catalog.setval('realtime.subscription_id_seq', 1, false);


--
-- PostgreSQL database dump complete
--

