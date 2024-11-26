import { useLocalSearchParams } from "expo-router";
import { Button, Text, View } from "react-native";
import SingleMarkerCard from "../../../components/SingleMarkerCard";
import useMarkerInfo from "../../../hooks/useMarkerInfo";
import { supabase } from "../../../utils/supabaseClient";
import { TouchableOpacity } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../../../components/Auth/AuthContext";

export default function SpotDetails() {
  const { spotId } = useLocalSearchParams();
  // const { user } = useContext(AuthContext);
  // console.log(user.id);
  const { data, isPending, error } = useMarkerInfo(spotId);

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
  function handleOnPress() {
    return supabase
      .from("users_markers")
      .insert([{ user_id: user.id, marker_id: spotId }])
      .select()
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return (
    <View className="p-4">
      <SingleMarkerCard markerData={data} />
      <TouchableOpacity
        className="bg-blue-500 py-2 px-4 rounded-full mt-4"
        onPress={handleOnPress}
      >
        <Text className="text-white text-center font-semibold">
          Add to planner
        </Text>
      </TouchableOpacity>
    </View>
  );
}

