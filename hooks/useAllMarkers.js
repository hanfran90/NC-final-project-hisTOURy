import { useQuery } from "@tanstack/react-query";
import { supabase } from "../utils/supabaseClient";

export default function useAllMarkers() {
  return useQuery({
    queryKey: ["allMarkers"],
    queryFn: () =>
      supabase
        .from("markers") 
        .select("*") 
        .then((response) => {
        //  console.log(data,"<<<<<data")
          return response.data; 
        }),
  });
}   