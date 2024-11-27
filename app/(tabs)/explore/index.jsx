import { useLocalSearchParams } from "expo-router";
import React, { useContext } from "react";
import { Text, View } from "react-native";
import AddNewMarkerButton from "../../../components/AddNewMarkerButton";
import InteractiveMap from "../../../components/InteractiveMap";
import MapLayerPlanner from "../../../components/MapLayerPlanner";
import useCurrentLocation from "../../../hooks/useCurrentLocation";
import NavigateTo from "../../../components/NavigateTo";
import { AuthContext } from "../../../components/Auth/AuthContext";
import MultiDropDown from "../../../components/MultiSelect";
import { useState } from "react";

export default function Explore() {
  const { route, navigate } = useLocalSearchParams();
  const { location, isPending, error } = useCurrentLocation(
    navigate === "true"
  );
  const { user } = useContext(AuthContext);
  const [selectedItems, setSelectedItems] = useState([]);

  if (isPending) return <Text>Pending...</Text>;
  if (error) return <Text>{JSON.stringify(error)}</Text>;
  if (!location) return <Text>No Location</Text>;

  console.log(route);

  return (
    <>
      <View>
        <MultiDropDown
          onSelectItems={(value) => {
            setSelectedItems(value);
          }}
        />
      </View>
      <View style={{ height: "100%" }}>
        <InteractiveMap
          coords={[location.longitude, location.latitude]}
          distance={1000}
          routeComponent={
            route === "show" && <MapLayerPlanner enable={route === "show"} />
          }
          filterCategories={selectedItems}
        />
      </View>
      <AddNewMarkerButton href="/explore/add-spot" />
      {user && (
        <NavigateTo
          href={
            navigate !== "true"
              ? "/explore?route=show&navigate=true"
              : "/explore"
          }
        >
          <Text className="text-center text-2xl font-bold text-white">Go</Text>
        </NavigateTo>
      )}
    </>
  );
}
