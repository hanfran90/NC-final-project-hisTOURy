import { useMutation } from "@tanstack/react-query";

export default function useUserVoteOnMarker() {
  const { userId } = useAuth();

  const [canVote] = useState(Boolean(userId));

  const { isPending, error, mutate } = useMutation({
    mutationKey: ["vote"],
    mutationFn: (callback) => (canVote ? callback : null),
  });

  const endpoint = supabase.from("votes");

  const addVote = (value) =>
    mutate(() =>
      endpoint.insert({
        user_id: userId,
        marker_id,
        value,
      })
    );

  const removeVote = (marker_id) =>
    mutate(() =>
      endpoint.delete().eq("user_id", userId).eq("marker_id", marker_id)
    );

  const updateVote = (marker_id, value) =>
    mutate(() =>
      endpoint
        .update({
          value,
        })
        .eq("user_id", userId)
        .eq("marker_id", marker_id)
    );

  return { canVote, addVote, removeVote, updateVote, isPending, error };
}
