import { useQuery } from "@tanstack/react-query";
import { supabase } from "../utils/supabaseClient";

export default function useNearbyMarkers({ coords, distance }) {
  return useQuery({
    queryKey: ["nearby-markers", coords[0], coords[1], distance],
    queryFn: () =>
      supabase
        .rpc("nearby_markers", {
          long: coords[0],
          lat: coords[1],
          distance,
        })
        .then((res) => res.data),
  });
}
