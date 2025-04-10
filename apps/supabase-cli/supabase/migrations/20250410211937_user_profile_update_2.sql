create or replace function handle_updated_user() returns trigger
    language plpgsql
as
$$BEGIN
  -- Check if the first_name or last_name has changed
  IF NEW.raw_user_meta_data ->> 'first_name' IS DISTINCT FROM OLD.raw_user_meta_data ->> 'first_name'
     OR NEW.raw_user_meta_data ->> 'last_name' IS DISTINCT FROM OLD.raw_user_meta_data ->> 'last_name' THEN

    -- Update the profiles table
UPDATE public.profiles
SET first_name = NEW.raw_user_meta_data ->> 'first_name',
    last_name = NEW.raw_user_meta_data ->> 'last_name'
WHERE id = NEW.id;

RAISE NOTICE 'UPDATE USER';
END IF;

RETURN NEW;
END;$$
SECURITY DEFINER
    SET search_path = public
;

DROP TRIGGER IF EXISTS on_auth_user_updated ON auth.users;

-- Create trigger to call the function after user data is updated
CREATE TRIGGER on_auth_user_updated
    AFTER UPDATE ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_user();
