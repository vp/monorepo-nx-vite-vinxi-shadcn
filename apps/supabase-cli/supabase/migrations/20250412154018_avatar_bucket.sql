-- Set up Storage!
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', TRUE);

-- Set up access controls for storage.
-- See https://supabase.com/docs/guides/storage#policy-examples for more details.
create policy "Avatar images are publicly accessible." on storage.objects
    for select using (bucket_id = 'avatars');

create policy "Anyone can upload an avatar." on storage.objects
    for insert with check (bucket_id = 'avatars');


ALTER TABLE public.profiles
    ADD COLUMN avatar_url text;


CREATE
    OR REPLACE FUNCTION "public"."handle_updated_user"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    SECURITY DEFINER
    SET "search_path" TO 'public'
AS
$$
BEGIN
    -- Check if the first_name or last_name has changed
    IF NEW.raw_user_meta_data ->> 'first_name' IS DISTINCT FROM OLD.raw_user_meta_data ->> 'first_name'
        OR NEW.raw_user_meta_data ->> 'last_name' IS DISTINCT FROM OLD.raw_user_meta_data ->> 'last_name'
        OR NEW.raw_user_meta_data ->> 'avatar_url' IS DISTINCT FROM OLD.raw_user_meta_data ->> 'avatar_url' THEN

        -- Update the profiles table
        UPDATE public.profiles
        SET first_name = NEW.raw_user_meta_data ->> 'first_name',
            last_name  = NEW.raw_user_meta_data ->> 'last_name',
            avatar_url = NEW.raw_user_meta_data ->> 'avatar_url'
        WHERE id = NEW.id;

    END IF;

    RETURN NEW;
END;
$$;

CREATE
    OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    SECURITY DEFINER
    SET "search_path" TO ''
AS
$$
begin
    insert into public.profiles (id, first_name, last_name, avatar_url)
    values (new.id,
            new.raw_user_meta_data ->> 'first_name',
            new.raw_user_meta_data ->> 'last_name',
            new.raw_user_meta_data ->> 'avatar_url');
    return new;
end;
$$;
