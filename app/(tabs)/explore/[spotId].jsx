import { useLocalSearchParams } from "expo-router";
import { Button, Text, View } from "react-native";
import SingleMarkerCard from "../../../components/SingleMarkerCard";
import useMarkerInfo from "../../../hooks/useMarkerInfo";
import { supabase } from "../../../utils/supabaseClient";
import { TouchableOpacity } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../../../components/Auth/AuthContext";
import useUserAddToPlanner from "../../../hooks/useUserAddToPlanner";

export default function SpotDetails() {
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
    <View className="p-4">
      <SingleMarkerCard markerData={data} />
      <TouchableOpacity
        className="bg-blue-500 py-2 px-4 rounded-full mt-4"
        onPress={addToPlanner}
        disabled={!canAddToPlanner}
      >
        <Text className="text-white text-center font-semibold">
          Add to planner
        </Text>
      </TouchableOpacity>
    </View>
  );
}
