-- create_user function
CREATE OR REPLACE FUNCTION create_user(email text) RETURNS UUID
AS $$
  DECLARE
  user_id uuid;
BEGIN
  user_id := gen_random_uuid();
  
 INSERT INTO
  auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    raw_app_meta_data,
    email_confirmed_at,
    created_at,
    updated_at
  )
  VALUES
    (
      gen_random_uuid(),
      user_id,
      'authenticated',
      'authenticated',
      email,
      extensions.crypt('123456', extensions.gen_salt ('bf')),
      '{"provider":"email","providers":["email"]}',
      NOW(),
      NOW(),
      NOW()
    );

  INSERT INTO
    auth.identities (
      id,
      user_id,
      identity_data,
      provider_id,
      provider,
      last_sign_in_at,
      created_at,
      updated_at
    )
  VALUES
    (
      gen_random_uuid(),
      user_id,
      format('{"sub":"%s","email":"%s"}', user_id::text, email)::jsonb,
      gen_random_uuid(),
      'email',
      NOW(),
      NOW(),
      NOW()
    );

    RETURN user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- pl/pgsql wrapper is required in order to execute function when seeding
DO $$
DECLARE
    vikki_id UUID;
    hannah_id UUID;
    georgia_id UUID;
    riona_id UUID;
    david_id UUID;
BEGIN
-- SEED USERS
    -- delete existing users
    DELETE FROM auth.users;

    -- create new users
    vikki_id := (SELECT create_user('vikki@nc.dev'));
    hannah_id := (SELECT create_user('hannah@nc.dev'));
    georgia_id := (SELECT create_user('georgia@nc.dev'));
    riona_id := (SELECT create_user('riona@nc.dev'));
    david_id := (SELECT create_user('david@nc.dev'));
    
-- SEED MARKERS
    INSERT INTO markers (title, longitude, latitude, user_id)
        VALUES 
            ('Emmeline Pankhurst Statue', -2.243056, 53.477778, riona_id),
            ('Mamucium Roman Fort Reconstruction', -2.2588591, 53.4754896, null),
            ('Manchester Cathedral', -2.2490792, 53.4851459, georgia_id),
            ('Alan Turing Memorial', -2.2407774, 53.4767288, hannah_id),
            ('Manchester Library', -2.24465105455576, 53.4781646404297, null),
            ('Manchester Central Station', -2.24755952549251, 53.4763296030546, null),
            ('NC Office', -2.23810383341322, 53.4721719765798, david_id),
            ('Roman Gardens', -2.25364964134124, 53.4757504929768, riona_id),
            ('Town Hall', -2.24427094085326, 53.4791958537723, vikki_id),
            ('Midland hotel', -2.24531978438671, 53.4771245864725, null),
            ('Manchester Art Gallery', -2.23988384178912, 53.4783760685976, null),
            ('Old Wellington Pub', -2.24394875223936, 53.4846719494712, david_id),
            ('Manchester Opera House', -2.25143518962375, 53.478906018399, georgia_id),
            ('Victoria Station', -2.24237366247465, 53.4878963937225, vikki_id),
            ('Manchester Museum', -2.2368268, 53.4664686, hannah_id)
    ;
END$$;

-- discard function
DROP FUNCTION create_user;
