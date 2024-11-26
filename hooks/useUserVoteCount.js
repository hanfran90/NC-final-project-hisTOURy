import { useQuery } from "@tanstack/react-query";
import { supabase } from "../utils/supabaseClient";

export default function useUserVoteCount(markerId) {
  return useQuery({
    queryKey: ["userVoteCount", markerId],
    queryFn: () =>
      supabase
        .from("votes")
        .select("user_id", { count: "exact" })
        .eq("marker_id", markerId)
        .then((response) => {
          console.log(response.data);
          return response.data;
        }),
  });
}
