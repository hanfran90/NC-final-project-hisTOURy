import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

export default function SpotDetails() {
  const { spotId } = useLocalSearchParams();

  return <Text>Page: Spot Details - {spotId}</Text>;
}
