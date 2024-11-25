import { useMutation } from "@tanstack/react-query";
import { supabase } from "../utils/supabaseClient";
import useUserPlanner from "./useUserPlanner";


export default function useDeleteAllPlanner() {
  const { data: planners, refetch } = useUserPlanner();
  const defaultPlannerId = planners && planners[0]?.planner_id;

  const mutation = useMutation({
    mutationKey: ["delete-from-planner"],
    mutationFn: () =>
      {return supabase
        .from("planners_markers")
        .delete()
        .eq("planner_id", defaultPlannerId)
      },
    onSuccess: () => refetch(),
    onError: (error) => {

      console.error("Error deleting marker:", error);
    }
    
  });

  return {  ...mutation };
}