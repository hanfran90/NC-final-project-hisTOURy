DROP FUNCTION IF EXISTS public.update_planner_sequence CASCADE;
CREATE FUNCTION public.update_planner_sequence (body jsonb) TABLE (planner_id INT, marker_id INT, sequence INT) AS $$
DECLARE
    plannerId int;
    marker jsonb;
    markerId int;
    seq int;
BEGIN
    plannerId := (body->'planner_id')::int;

    FOR marker IN
        SELECT * FROM jsonb_array_elements(body->'markers')
    LOOP
        markerId := (marker->'marker_id')::int;
        seq := (marker->'sequence')::int;

        UPDATE public.planners_markers
            SET "sequence" = seq
            WHERE planner_id = plannerId AND marker_id = markerId;
            RETURNING planner_id, marker_id, sequence;
    END LOOP;
END;
$$ LANGUAGE plpgsql;