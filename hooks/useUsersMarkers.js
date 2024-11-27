import { useQuery } from "@tanstack/react-query";
import { supabase } from "../utils/supabaseClient";
import { useContext } from "react";
import { AuthContext } from "../components/Auth/AuthContext";

export default function useUserMarkers() {
  const { userId } = useContext(AuthContext);

  return useQuery({
    queryKey: ["user-markers", userId],
    queryFn: () =>
      supabase
        .from("markers")
        .select()
        .eq("user_id", userId)
        .then((response) => {
          return response.data;
        }),
  });
}
