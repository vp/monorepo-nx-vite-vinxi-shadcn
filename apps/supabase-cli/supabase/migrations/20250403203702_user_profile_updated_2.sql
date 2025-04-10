-- Create function to update profile from updated user data only if metadata changed
CREATE OR REPLACE FUNCTION public.handle_updated_user()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.raw_user_meta_data ->> 'first_name' IS DISTINCT FROM OLD.raw_user_meta_data ->> 'first_name' OR
     NEW.raw_user_meta_data ->> 'last_name' IS DISTINCT FROM OLD.raw_user_meta_data ->> 'last_name' THEN
UPDATE public.profiles
SET first_name = NEW.raw_user_meta_data ->> 'first_name',
    last_name = NEW.raw_user_meta_data ->> 'last_name'
WHERE id = NEW.id;
END IF;
RETURN NEW;
END;
$$ LANGUAGE plpgsql;


DROP TRIGGER IF EXISTS on_auth_user_updated ON auth.users;

-- Create trigger to call the function after user data is updated
CREATE TRIGGER on_auth_user_updated
    AFTER UPDATE ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_user();
