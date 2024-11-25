import { View } from "react-native";
import HeadingTop from "../../components/HeadingTop";
import DevAuthenticatedUser from "../../dev_components/DevAuthenticatedUser";
import DevReadMarkersWithLongLat from "../../dev_components/DevReadMarkersWithLongLat";
import DevTestNearby from "../../dev_components/DevTestNearby";
import DevUserPlanner from "../../dev_components/DevUserPlanner";

export default function Page() {
  return (
    <View className="p-4">
      <HeadingTop>Dev Page</HeadingTop>
      <DevAuthenticatedUser />
      <DevReadMarkersWithLongLat />
      <DevTestNearby />
      <DevUserPlanner />
    </View>
  );
}
