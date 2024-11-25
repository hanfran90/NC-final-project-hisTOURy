import { useQuery } from "@tanstack/react-query";
import { supabase } from "../utils/supabaseClient";

export default function useUserPlanner(userId) {
  return useQuery({
    queryKey: ["user", "planner"],
    queryFn: () =>
      supabase
        .from("profiles")
        .select("user_id, planner:users_markers(markers(*))")
        .eq("user_id", userId)
        .then((res) => res.data[0].planner),
  });
}
