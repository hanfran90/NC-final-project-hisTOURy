import { useMutation } from "@tanstack/react-query";

export default function useCastVote() {
  return useMutation({
    mutationKey: ["cast-vote"],
    mutationFn: () => {},
  });
}
