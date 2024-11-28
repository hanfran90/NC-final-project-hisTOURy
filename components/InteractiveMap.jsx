import Mapbox, {
  Camera,
  LocationPuck,
  MapView,
  MarkerView,
  ShapeSource,
  SymbolLayer,
  Images,
} from "@rnmapbox/maps";
import { Link, useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import useNearbyMarkers from "../hooks/useNearbyMarkers";
import { FontAwesome6 } from "@expo/vector-icons";
import CustomButton from "./CustomButton";

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_PK);

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  map: {
    flex: 1,
  },
  icon: {
    iconImage: "green_marker",
    iconSize: 0.1,
  },
  iconSelected: {
    iconImage: "marker",
    iconSize: 3,
  },
  calloutContainerStyle: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    width: "90%",
  },
  customCalloutText: {
    color: "black",
    fontSize: 16,
  },
});

export default function InteractiveMap({
  coords,
  distance = 1000000,
  onSelectPlace = () => null,
  isInSelectMode = false,
  routeComponent,
  route,
  navigate,
  filterCategories,
}) {
  const { data, isPending, error } = useNearbyMarkers({
    coords,
    distance,
    cats: filterCategories,
  });
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);
  const [focusedCoords, setFocusedCoord] = useState(coords);

  const router = useRouter();

  if (isPending) return <Text>Pending...</Text>;

  const geojson = {
    type: "FeatureCollection",
    features: data?.map((point) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [point.longitude, point.latitude],
      },
      properties: {
        title: point.title,
        marker_id: point.marker_id,
        image: point.image,
      },
    })),
  };

  const geojsonLongPress = selectedCoordinates && {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [selectedCoordinates[0], selectedCoordinates[1]],
        },
        properties: {
          title: "selected",
        },
      },
    ],
  };

  function onPinPress(event) {
    const feature = event?.features[0];

    setSelectedFeature((prevSelectedFeature) => {
      if (prevSelectedFeature && prevSelectedFeature.id === feature.id) {
        setFocusedCoord(null);
        return null;
      }

      setFocusedCoord(feature.geometry.coordinates);
      return feature;
    });
  }

  function handleLongPress(event) {
    if (!isInSelectMode) return;
    onSelectPlace(event.geometry.coordinates);
    setSelectedCoordinates(event.geometry.coordinates);
  }

  function closePopUp() {
    setSelectedFeature(null);
    setFocusedCoord(null);
  }

  function MarkerPopUp({ item: { title, marker_id, image } }) {
    return (
      <View style={styles.calloutContainerStyle} className="relative">
        <Text className="font-bold text-xl mb-2">{title}</Text>
        <TouchableOpacity
          className="absolute top-2 end-2"
          onPress={() => {
            closePopUp();
          }}
        >
          <FontAwesome6 size={26} name="xmark" color="#ef4444" />
        </TouchableOpacity>
        <Image source={{ uri: image }} className="h-48 rounded-xl" />
        <CustomButton
          title="Take me here"
          color="primary"
          onPress={() => router.push(`(tabs)/explore/${marker_id}`)}
        />
      </View>
    );
  }

  return (
    <>
      {JSON.stringify(coords) !== JSON.stringify(focusedCoords) && (
        <Button
          title="Reset Focus"
          onPress={() => {
            setFocusedCoord(coords);
            setSelectedFeature(null);
          }}
        />
      )}
      <View style={styles.container}>
        <MapView style={styles.map} onLongPress={handleLongPress}>
          {route !== "show" && (
            <Camera zoomLevel={15} centerCoordinate={focusedCoords} />
          )}
          <LocationPuck puckBearing="heading" puckBearingEnabled />
          <Images
            images={{
              green_marker: require("../assets/green-marker.png"),
            }}
          />
          {/* location markers */}
          {!isInSelectMode && route !== "show" && (
            <ShapeSource id="points" shape={geojson} onPress={onPinPress}>
              <SymbolLayer
                id="point-layer"
                source="points"
                style={styles.icon}
              />
            </ShapeSource>
          )}
          {/*long press icon */}
          {geojsonLongPress && (
            <ShapeSource id="selectedCoords" shape={geojsonLongPress}>
              <SymbolLayer
                id="selected-layer"
                source="selectedCoords"
                style={styles.iconSelected}
              />
            </ShapeSource>
          )}
          {/*selected feature pop up */}
          {selectedFeature && (
            <MarkerView coordinate={selectedFeature.geometry.coordinates}>
              <MarkerPopUp item={selectedFeature?.properties} />
            </MarkerView>
          )}
          {route && routeComponent}
        </MapView>
      </View>
    </>
  );
}
