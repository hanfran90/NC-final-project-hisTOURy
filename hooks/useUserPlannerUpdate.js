import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../utils/supabaseClient";
import useUserPlanner from "./useUserPlanner";

export default function useUserPlannerUpdate() {
  const queryClient = useQueryClient();
  const { data: planners } = useUserPlanner();

  const planner_id = planners?.[0]?.planner_id;

  return useMutation({
    mutationKey: ["user", "planner", "update"],
    mutationFn: (planner) =>
      supabase.rpc("update_planner_sequence", {
        body: {
          planner_id,
          items: planner.map(({ marker: { marker_id } }, index) => {
            return {
              marker_id,
              sequence: index,
            };
          }),
        },
      }),
    onSuccess: () => queryClient.invalidateQueries(["user", "planner"]),
  });
}
