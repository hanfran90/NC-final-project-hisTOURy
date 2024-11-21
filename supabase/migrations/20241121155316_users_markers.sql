DROP TABLE IF EXISTS "users_markers" CASCADE;
CREATE TABLE "users_markers" (
  "user_id" uuid,
  "marker_id" serial,
  "sequence" int
);
ALTER TABLE "users_markers" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");
ALTER TABLE "users_markers" ADD FOREIGN KEY ("marker_id") REFERENCES "markers" ("marker_id");