DROP TABLE IF EXISTS users_markers CASCADE;
CREATE TABLE users_markers (
  user_id uuid REFERENCES profiles (user_id),
  marker_id serial REFERENCES markers (marker_id),
  sequence int
);