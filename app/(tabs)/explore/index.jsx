import React from "react";
import { Text, View } from "react-native";
import useCurrentLocation from "../../../hooks/useCurrentLocation";
import InteractiveMap from "../../../components/InteractiveMap";
import AddNewMarkerButton from "../../../components/AddNewMarkerButton";
import useUserPlanner from "../../../hooks/useUserPlanner";

export default function Explore() {
  const { location, isPending, error } = useCurrentLocation();
  const { data } = useUserPlanner();

  if (isPending) return <Text>Pending...</Text>;
  if (error) return <Text>{JSON.stringify(error)}</Text>;
  if (!location) return <Text>No Location</Text>;

  const longLat = [location.longitude, location.latitude];

  const routeCoords =
    data &&
    data[0].items.map((item) => {
      return [item.marker.longitude, item.marker.latitude];
    });

  return (
    <>
      <View style={{ height: "100%" }}>
        <InteractiveMap
          coords={longLat}
          distance={1000}
          routeCoords={routeCoords}
        />
      </View>
      <AddNewMarkerButton href="/explore/add-spot">
        <Text className="text-center text-2xl font-bold text-white">+</Text>
      </AddNewMarkerButton>
    </>
  );
}
