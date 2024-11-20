import Mapbox, {
  Camera,
  LocationPuck,
  MapView,
  ShapeSource,
  SymbolLayer,
} from "@rnmapbox/maps";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import useNearbyMarkers from "../hooks/useNearbyMarkers";

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

export default function InteractiveMap({ coords, distance }) {
  const [geoJson, setGeoJson] = useState(null);
  const { data, isPending, error } = useNearbyMarkers({ coords, distance });

  if (isPending) return <Text>Pending...</Text>;

  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        <Camera zoomLevel={15} centerCoordinate={coords} />
        <LocationPuck
          puckBearing="heading"
          puckBearingEnabled
          // pulsing={{ isEnabled: true, color: "#000000" }}
        />
        <ShapeSource id="points" shape={geoJson}>
          <SymbolLayer id="point-layer" source="points" style={styles.icon} />
        </ShapeSource>
      </MapView>
    </View>
  );
}
