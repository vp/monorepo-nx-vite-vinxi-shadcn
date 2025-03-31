SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.8
-- Dumped by pg_dump version 15.8

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
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

-- INSERT INTO "storage"."buckets" ("id", "name", "owner", "created_at", "updated_at", "public", "avif_autodetection", "file_size_limit", "allowed_mime_types", "owner_id") VALUES
-- 	('images', 'images', NULL, '2025-03-30 22:53:37.106631+00', '2025-03-30 22:53:37.106631+00', false, false, NULL, NULL, NULL);


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

-- INSERT INTO "storage"."objects" ("id", "bucket_id", "name", "owner", "created_at", "updated_at", "last_accessed_at", "metadata", "version", "owner_id", "user_metadata", "level") VALUES
-- 	('d0c4e2d4-22cd-4566-a457-9d307f2ad637', 'images', 'Scan 37.tiff', NULL, '2025-03-30 22:54:14.997631+00', '2025-03-30 22:54:14.997631+00', '2025-03-30 22:54:14.997631+00', '{"eTag": "\"5f5ffcaeacaa3c22a88175a097623f26\"", "size": 7665986, "mimetype": "image/tiff", "cacheControl": "max-age=3600", "lastModified": "2025-03-30T22:54:14.773Z", "contentLength": 7665986, "httpStatusCode": 200}', 'd7aa9eab-caab-4009-9aad-2923db2fbdb1', NULL, NULL, 1);
--

--
-- Data for Name: prefixes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- PostgreSQL database dump complete
--

RESET ALL;
