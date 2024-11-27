import { useQuery } from "@tanstack/react-query";
import { supabase } from "../utils/supabaseClient";

export default function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      supabase
        .from("categories")
        .select()
        .order("positioning")
        .then((response) => {
          const map = new Map();

          response.data.forEach(({ grouping, ...rest }) => {
            const keyExists = map.has(grouping);

            if (!keyExists) map.set(grouping, []);

            const getGroup = map.get(grouping);

            getGroup.push({ ...rest });
          });

          const result = [];

          map.forEach((value, key) =>
            result.push({ name: key, category_id: key, items: value })
          );

          return result;
        }),
    staleTime: 60000,
  });
}
