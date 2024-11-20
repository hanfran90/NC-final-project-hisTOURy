import { View } from "react-native";
import { Link } from "expo-router";

export default function NavigationBar() {
  return (
    <View>
      <Link href="/home">Map</Link>
      <Link href="/profile">Profile</Link>
      <Link href="/planner">Planner</Link>
      <Link href="/map">Interactive Map</Link>
      <Link href="/createMarker">Create Marker</Link>
    </View>
  );
}
