DROP TABLE IF EXISTS "mcr-poi" CASCADE;

CREATE TABLE "mcr-poi" (
  "marker_id" serial PRIMARY KEY,
  "title" varchar NOT NULL,
  "description" varchar(255),
  "address" varchar,
  "location" gis.geography(POINT) NOT NULL,
  "user_id" uuid, 
  "image" varchar, 
  "date" varchar,
  "era" varchar
)

INSERT INTO "mcr-poi" ("title", "address", "location", "description", "era", "date")
VALUES ('Nico Ditch','Ashton-under-Lyne',gis.st_point(-2.399854, 53.308345),'Nico Ditch is an earthwork stretching from Ashton Moss in the east to Hough Moss in the west. According to legend, the ditch was dug in a single night as a defence against Viking invaders in 869–870. However, the U-shaped profile of the ditch indicates it was not defensive as it would most likely be V-shaped. It was probably used as an administrative boundary. The ditch is visible in sections, and in places is about 1.5 m (4.9 ft) deep and up to 4 m (13 ft) wide.','Anglo Saxon','c. 8th Century');