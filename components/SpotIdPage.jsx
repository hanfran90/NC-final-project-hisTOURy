import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import useMarkerInfo from "../hooks/useMarkerInfo";
import useUserAddToPlanner from "../hooks/useUserAddToPlanner";
import CustomButton from "./CustomButton";
import SingleMarkerCard from "./SingleMarkerCard";
import UserVoteCard from "./UserVoteCard";
import AverageVoteCard from "./AverageVoteCard";

export default function SpotIdPage() {
  const { spotId } = useLocalSearchParams();
  const marker_id = Number(spotId);
  const { data, isPending, error } = useMarkerInfo(marker_id);
  const {
    canAddToPlanner,
    isPending: isMutating,
    error: mutationError,
    mutate: addToPlanner,
  } = useUserAddToPlanner(marker_id);

  if (isPending) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View>
        <Text>No data available.</Text>
      </View>
    );
  }
  return (
    <ScrollView>
      <View className="p-4">
        <Stack.Screen options={{ title: data.title }} />
        <SingleMarkerCard markerData={data} />
        <CustomButton
          title={"Add to Planner"}
          color={"primary"}
          onPress={addToPlanner}
          disabled={!canAddToPlanner}
        />
        <UserVoteCard marker_id={spotId} />
        <AverageVoteCard
          marker_id={spotId}
          avgVote={data.avg_vote}
          userVoteCount={data.user_vote_count}
        />
      </View>
    </ScrollView>
  );
}
