SET
statement_timeout = 0;
SET
lock_timeout = 0;
SET
idle_in_transaction_session_timeout = 0;
SET
client_encoding = 'UTF8';
SET
standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET
check_function_bodies = false;
SET
xmloption = content;
SET
client_min_messages = warning;
SET
row_security = off;


CREATE
EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";

COMMENT
ON SCHEMA "public" IS 'standard public schema';

CREATE
EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE
EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE
EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE
EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE
EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE
EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE
OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
begin
insert into public.profiles (id, first_name, last_name)
values (new.id, new.raw_user_meta_data ->> 'first_name', new.raw_user_meta_data ->> 'last_name');
return new;
end;
$$;


ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";


CREATE
OR REPLACE FUNCTION "public"."handle_updated_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$BEGIN
  -- Check if the first_name or last_name has changed
  IF NEW.raw_user_meta_data ->> 'first_name' IS DISTINCT FROM OLD.raw_user_meta_data ->> 'first_name'
     OR NEW.raw_user_meta_data ->> 'last_name' IS DISTINCT FROM OLD.raw_user_meta_data ->> 'last_name' THEN

    -- Update the profiles table
UPDATE public.profiles
SET first_name = NEW.raw_user_meta_data ->> 'first_name', last_name = NEW.raw_user_meta_data ->> 'last_name'
WHERE id = NEW.id;

END IF;

RETURN NEW;
END;$$;


ALTER FUNCTION "public"."handle_updated_user"() OWNER TO "postgres";


CREATE
OR REPLACE FUNCTION "public"."update_updated_at_column"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  NEW.updated_at
= now();
RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."update_updated_at_column"() OWNER TO "postgres";

SET
default_tablespace = '';

SET
default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."profiles"
(
    "id"
    "uuid"
    NOT
    NULL,
    "first_name"
    "text",
    "last_name"
    "text",
    "created_at"
    timestamp
    with
    time
    zone
    DEFAULT
    "now"
(
),
    "updated_at" timestamp with time zone DEFAULT "now"()
    );


ALTER TABLE "public"."profiles" OWNER TO "postgres";


ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");



CREATE
OR REPLACE TRIGGER "update_profiles_updated_at" BEFORE
UPDATE ON "public"."profiles" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON
DELETE
CASCADE;



CREATE
POLICY "Users can insert their own profile." ON "public"."profiles" FOR INSERT WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "id"));



CREATE
POLICY "Users can update own profile." ON "public"."profiles" FOR
UPDATE USING ((( SELECT "auth"."uid"() AS "uid") = "id"));



CREATE
POLICY "Users can update their own profile" ON "public"."profiles" FOR
UPDATE TO "authenticated" USING (("auth"."uid"() = "id"))
WITH CHECK (("auth"."uid"() = "id"));



CREATE
POLICY "Users can view their own profile" ON "public"."profiles" FOR
SELECT TO "authenticated" USING (("auth"."uid"() = "id"));



ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;


ALTER
PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA
"public" TO "postgres";
GRANT USAGE ON SCHEMA
"public" TO "anon";
GRANT USAGE ON SCHEMA
"public" TO "authenticated";
GRANT USAGE ON SCHEMA
"public" TO "service_role";


GRANT ALL
ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL
ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL
ON FUNCTION "public"."handle_new_user"() TO "service_role";


GRANT ALL
ON FUNCTION "public"."handle_updated_user"() TO "anon";
GRANT ALL
ON FUNCTION "public"."handle_updated_user"() TO "authenticated";
GRANT ALL
ON FUNCTION "public"."handle_updated_user"() TO "service_role";

GRANT ALL
ON FUNCTION "public"."update_updated_at_column"() TO "anon";
GRANT ALL
ON FUNCTION "public"."update_updated_at_column"() TO "authenticated";
GRANT ALL
ON FUNCTION "public"."update_updated_at_column"() TO "service_role";

GRANT ALL
ON TABLE "public"."profiles" TO "anon";
GRANT ALL
ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL
ON TABLE "public"."profiles" TO "service_role";

ALTER
DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER
DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER
DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER
DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";


ALTER
DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER
DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER
DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER
DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";


ALTER
DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER
DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER
DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER
DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET
ALL;

--
-- Dumped schema changes for auth and storage
--

CREATE
OR REPLACE TRIGGER "on_auth_user_created" AFTER INSERT ON "auth"."users" FOR EACH ROW EXECUTE FUNCTION "public"."handle_new_user"();



CREATE
OR REPLACE TRIGGER "on_auth_user_updated" AFTER
UPDATE ON "auth"."users" FOR EACH ROW EXECUTE FUNCTION "public"."handle_updated_user"();



