import Mapbox, { MapView } from "@rnmapbox/maps";
import { StyleSheet, View } from "react-native";

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_PK);

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: "100%",
  },
  map: {
    flex: 1,
  },
});

function MapboxExample() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map}></MapView>
    </View>
  );
}

export default MapboxExample;
