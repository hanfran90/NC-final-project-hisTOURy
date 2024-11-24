import { useMutation } from "@tanstack/react-query";
import { supabase } from "../utils/supabaseClient";
import useUserPlanner from "./useUserPlanner";

export default function useUserAddToPlanner(marker_id) {
  const { data: planners, refetch } = useUserPlanner();

  const defaultPlannerId = planners && planners[0]?.planner_id;
  const canAddToPlanner =
    defaultPlannerId &&
    marker_id &&
    planners[0].items.every(
      ({ marker: { marker_id: mid } }) => mid !== marker_id
    );

  const mutation = useMutation({
    mutationKey: ["add-to-planner"],
    mutationFn: () =>
      supabase
        .from("planners_markers")
        .insert({
          planner_id: defaultPlannerId,
          marker_id,
        })
        .select(),
    onSuccess: () => refetch(),
    enable: canAddToPlanner,
  });

  return { canAddToPlanner, ...mutation };
}
