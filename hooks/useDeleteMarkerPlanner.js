import { useMutation } from "@tanstack/react-query";
import { supabase } from "../utils/supabaseClient";
import useUserPlanner from "./useUserPlanner";


export default function useDeleteMarkerPlanner() {
  const { data: planners, refetch } = useUserPlanner();
  const defaultPlannerId = planners && planners[0]?.planner_id;

  const mutation = useMutation({
    mutationKey: ["delete-from-planner"],
    mutationFn: (marker_id) =>
      {return supabase
        .from("planners_markers")
        .delete()
        .eq("planner_id", defaultPlannerId)
        .eq('marker_id', marker_id)},
    onSuccess: () => refetch(),
    onError: (error) => {

      console.error("Error deleting marker:", error);
    }
    
  });

  return {  ...mutation };
}