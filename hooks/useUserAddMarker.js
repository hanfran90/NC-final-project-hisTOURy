import { useMutation } from "@tanstack/react-query";
import { supabase } from "../utils/supabaseClient";
import { useContext } from "react";
import { AuthContext } from "../components/Auth/AuthContext";

export default function useUserAddMarker() {
  const { userId } = useContext(AuthContext);

  return useMutation({
    mutationKey: ["add-marker"],
    mutationFn: ({ title, description, coordinates, image }) => {
      return supabase
        .from("markers")
        .insert({
          title,
          description,
          longitude: coordinates[0],
          latitude: coordinates[1],
          image,
          user_id: userId,
        })
        .select()
        .then((response) => response.data[0]);
    },
    enable: Boolean(userId),
  });
}
