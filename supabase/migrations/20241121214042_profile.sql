DROP TABLE IF EXISTS public.profiles CASCADE;
CREATE TABLE public.profiles (
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  PRIMARY KEY (user_id)
);

CREATE OR REPLACE FUNCTION public.handle_new_user()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  SECURITY DEFINER SET search_path = ''
  AS $$
  BEGIN
    INSERT INTO public.profiles (user_id)
      VALUES (new.id);
    RETURN new;
  END;
  $$;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
    FOR EACH ROW
      EXECUTE PROCEDURE public.handle_new_user();