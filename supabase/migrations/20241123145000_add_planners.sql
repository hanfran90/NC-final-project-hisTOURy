-- CREATE TABLE
DROP TABLE IF EXISTS planners CASCADE;
CREATE TABLE planners (
  planner_id serial NOT NULL PRIMARY KEY,
  profile_id UUID NOT NULL REFERENCES profiles ON DELETE CASCADE,
  title varchar DEFAULT 'default',
  UNIQUE (profile_id, title)
);

-- HANDLE NEW PROFILE
CREATE OR REPLACE FUNCTION public.handle_new_profile()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  AS $$
  BEGIN
    INSERT INTO public.planners (profile_id)
      VALUES (new.profile_id);
    RETURN new;
  END;
  $$;

CREATE OR REPLACE TRIGGER on_profile_created
  AFTER INSERT ON public.profiles
    FOR EACH ROW
      EXECUTE PROCEDURE public.handle_new_profile();