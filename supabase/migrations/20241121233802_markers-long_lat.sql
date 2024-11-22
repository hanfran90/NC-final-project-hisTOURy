ALTER TABLE markers ADD COLUMN IF NOT EXISTS longitude FLOAT;
UPDATE markers SET longitude = gis.st_x(location::gis.geometry);

ALTER TABLE markers ADD COLUMN IF NOT EXISTS latitude FLOAT;
UPDATE markers SET latitude = gis.st_y(location::gis.geometry);