CREATE
POLICY "Users can update their own profile"
ON public.profiles
FOR
UPDATE
    TO authenticated
    USING (auth.uid() = id) -- Ensures the user owns the profile being updated
WITH CHECK (auth.uid() = id); -- Ensures the updated profile still belongs to the user

CREATE
POLICY "Users can view their own profile"
ON public.profiles
FOR
SELECT
    TO authenticated
    USING (auth.uid() = id);


create policy "Users can insert their own profile." on profiles
  for insert with check ((select auth.uid()) = id);

create policy "Users can update own profile." on profiles
  for update using ((select auth.uid()) = id);
