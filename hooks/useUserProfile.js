import { useQueries } from "@tanstack/react-query";
import { supabase } from "../utils/supabaseClient";
import useAuth from "../components/Auth/useAuth";

export default function useUserProfile() {
  const { userId } = useAuth();

  const queries = userId
    ? ["profiles", "planners", "votes"].map((table) => ({
        queryKey: [table, "user", userId],
        queryFn: () => supabase.from(table).select().eq("user_id", userId),
      }))
    : [];

  return useQueries({
    queries,
  });
}
