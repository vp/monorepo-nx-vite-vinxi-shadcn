ALTER TABLE public.profiles
    ADD COLUMN created_at TIMESTAMPTZ DEFAULT now(),
ADD COLUMN updated_at TIMESTAMPTZ DEFAULT now();

CREATE
OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at
= now();
RETURN NEW;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE
    ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
