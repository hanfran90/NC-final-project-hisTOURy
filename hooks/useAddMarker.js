import { useMutation } from "@tanstack/react-query";
import { supabase } from "../utils/supabaseClient";

function useAddMarker() {
  return useMutation({
    mutationKey: ["add-marker"],
    mutationFn: ({ title, description, coordinates }) => {
      return supabase
        .from("markers")
        .insert({
          title,
          description,
          longitude: coordinates[0],
          latitude: coordinates[1],
        })
        .select()
        .then((response) => {
          return response.data[0];
        });
    },
  });
}

export default useAddMarker;
