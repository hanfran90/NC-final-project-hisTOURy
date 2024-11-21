import { useLocalSearchParams } from "expo-router";
import { Text, View, ActivityIndicator } from "react-native";
import SingleMarkerCard from "../../../components/SingleMarkerCard";
import useMarkerInfo from "../../../hooks/useMarkerInfo";

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
        <Text>Error: {error.message || "Something went wrong."}</Text>
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
    <View>
      {/* <Text>Page: Spot Details - {spotId}</Text> */}
      <SingleMarkerCard markerData={data}/>
    </View>
  );
}