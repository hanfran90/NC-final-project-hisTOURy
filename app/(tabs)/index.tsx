import { View, Text, StyleSheet } from "react-native";
import useCurrentLocation from "../../hooks/useCurrentLocation";
import MapboxExample from "../../components/MapboxExample";

export default function Tab() {
  const { location, error } = useCurrentLocation();

  return (
    <View>
      <Text>{JSON.stringify(location || error)}</Text>
      <Text>Hello World</Text>
      <MapboxExample />
    </View>
  );
}
