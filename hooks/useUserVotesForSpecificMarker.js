import { useContext } from "react";
import { AuthContext } from "../components/Auth/AuthContext";
import { supabase } from "../utils/supabaseClient";
import { useQuery } from "@tanstack/react-query";

export default function useUserVotesForMarker(marker_id) {
  const { userId } = useContext(AuthContext);

  return useQuery({
    queryKey: ["user", "votes", marker_id ?? "all"],
    queryFn: () => {
      let query = supabase.from("votes");

      if (marker_id) {
        query = query.select("value").eq("marker_id", marker_id);
      } else {
        query = query.select("*, marker:markers(marker_id, title)");
      }

      query = query.eq("user_id", userId).then((res) => res.data);

      return query;
    },
    enabled: Boolean(userId),
  });
}
