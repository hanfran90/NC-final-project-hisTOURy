import { useMutation } from "@tanstack/react-query";

export default function useInsertUserVote() {
  return useMutation({
    mutationKey: ["user", "vote"],
    mutationFn: ({ user_id, marker_id, value }) =>
      supabase.from("votes").insert({
        user_id,
        marker_id,
        value,
      }),
  });
}
