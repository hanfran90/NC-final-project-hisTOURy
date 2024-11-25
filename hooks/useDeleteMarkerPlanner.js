import { useMutation } from "@tanstack/react-query";
import { supabase } from "../utils/supabaseClient";
import useUserPlanner from "./useUserPlanner";

export default function useDeleteMarkerPlanner(marker_id) {
  const { data: planners, refetch } = useUserPlanner();

  const defaultPlannerId = planners && planners[0]?.planner_id;
  const canAddToPlanner =
    defaultPlannerId &&
    marker_id &&
    planners[0].items.every(
      ({ marker: { marker_id: mid } }) => mid !== marker_id
    );

  const mutation = useMutation({
    mutationKey: ["delete-from-planner"],
    mutationFn: () =>
      supabase
        .from("planners_markers")
        .delete()
        .eq('marker_id', marker_id)
        ,
    onSuccess: () => refetch(),
    onError: (error) => {
 
      console.error("Error deleting marker:", error);
    }
    
  });

  return { canAddToPlanner, ...mutation };
}