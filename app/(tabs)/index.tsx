import { Text, View } from "react-native";
import useCurrentLocation from "../../hooks/useCurrentLocation";
import InteractiveMap from "../../components/InteractiveMap";

export default function Tab() {
  const { location, isPending, error } = useCurrentLocation();

  if (isPending) return <Text>Pending...</Text>;
  if (error) return <Text>{JSON.stringify(error)}</Text>;
  if (!location) return <Text>No Location</Text>;

  const longLat = [location.longitude, location.latitude];

  return (
    <>
      <View style={{ height: "100%" }}>
        <InteractiveMap coords={longLat} distance={1000} />
      </View>
    </>
  );
}
