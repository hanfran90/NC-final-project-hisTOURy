import { useQuery } from "@tanstack/react-query";
import { supabase } from "../utils/supabaseClient";

export default function useUserMarkers(userId) {
  return useQuery({
    queryKey: ["user-markers", userId],
    queryFn: () =>
      supabase
        .from("markers")
        .select("*")
        .eq("user_id", userId)
        .then((response) => {
          return response.data;
        }),
  });
}
