import { useQuery } from "@tanstack/react-query";
import { supabase } from "../utils/supabaseClient";
import { AuthContext } from "../components/Auth/AuthContext";
import { useContext } from "react";

export default function useUserMarkerVotes() {
  const { userId } = useContext(AuthContext);
  return useQuery({
    queryKey: ["user", "userVotes", userId],
    queryFn: () =>
      supabase
        .from("votes")
        .select("marker_id, markers(*)")
        .eq("user_id", userId)
        .then(({ data }) => {
          return data.map((vote) => vote.markers);
        }),
    enabled: Boolean(userId),
  });
}
