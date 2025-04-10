-- Create function to update profile from updated user data
CREATE
OR REPLACE FUNCTION public.handle_updated_user()
RETURNS TRIGGER AS $$
BEGIN
UPDATE public.profiles
SET first_name = NEW.raw_user_meta_data ->> 'first_name', last_name = NEW.raw_user_meta_data ->> 'last_name'
WHERE id = NEW.id;
RETURN NEW;
END;
$$
LANGUAGE plpgsql;

-- Create trigger to call the function after user data is updated
CREATE TRIGGER on_auth_user_updated
    AFTER UPDATE
    ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_user();
