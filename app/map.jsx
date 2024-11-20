import Mapbox, {
  Camera,
  MapView,
  ShapeSource,
  SymbolLayer,
  UserLocation,
} from "@rnmapbox/maps";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import useCurrentLocation from "../hooks/useCurrentLocation";

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_PK);

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: "100%",
  },
  map: {
    flex: 1,
  },
  icon: {
    iconImage: "rocket",
    iconSize: 1.5,
  },
});

export default function map() {
  const [geoJson, setGeoJson] = useState(null);
  const { location, isPending, error } = useCurrentLocation();

  if (isPending) return <Text>Pending...</Text>;
  if (error) return <Text>{JSON.stringify(error)}</Text>;

  const longLat = [location?.longitude, location?.latitude];
  console.log({ isPending, longLat, location });

  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        <Camera zoomLevel={15} centerCoordinate={longLat} />
        <UserLocation
          androidRenderMode="compass"
          onUpdate={(location) => setUserLocation(location)}
          showsUserHeadingIndicator
          visible
        />
        <ShapeSource id="points" shape={geoJson}>
          <SymbolLayer id="point-layer" source="points" style={styles.icon} />
        </ShapeSource>
      </MapView>
    </View>
  );
}
