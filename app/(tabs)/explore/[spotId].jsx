import { useLocalSearchParams } from "expo-router";
import { Text, View, ActivityIndicator, Button } from "react-native";
import SingleMarkerCard from "../../../components/SingleMarkerCard";
import useMarkerInfo from "../../../hooks/useMarkerInfo";
import { supabase } from "../../../utils/supabaseClient";

export default function SpotDetails() {
  const { spotId } = useLocalSearchParams();

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
      .insert([
        { user_id: "9c6cb5c1-0f40-43e8-8936-ac63d8832990", marker_id: spotId },
      ])
      .select()
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return (
    <View>
      {/* <Text>Page: Spot Details - {spotId}</Text> */}
      <SingleMarkerCard markerData={data} />
      <Button title="Add to planner" onPress={handleOnPress} />
    </View>
  );
}
