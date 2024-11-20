import Mapbox, {
	Camera,
	LocationPuck,
	MapView,
	MarkerView,
	ShapeSource,
	SymbolLayer,
} from "@rnmapbox/maps";
import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import useNearbyMarkers from "../hooks/useNearbyMarkers";

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
		iconImage: "rocket",
		iconSize: 1.5,
	},
	calloutContainerStyle: {
		backgroundColor: "white",
		padding: 10,
		borderRadius: 5,
	},
	customCalloutText: {
		color: "black",
		fontSize: 16,
	},
});

export default function InteractiveMap({ coords, distance, onSelectPlace=() => null} ) {
	const { data, isPending, error } = useNearbyMarkers({ coords, distance });
	const [selectedFeature, setSelectedFeature] = useState(null);

	if (isPending) return <Text>Pending...</Text>;

	const geojson = {
		type: "FeatureCollection",
		features: data.map((point) => ({
			type: "Feature",
			geometry: {
				type: "Point",
				coordinates: [point.longitude, point.latitude],
			},
			properties: {
				title: point.title,
			},
		})),
	};

	function onPinPress(event) {
		const feature = event?.features[0];
		setSelectedFeature((prevSelectedFeature) =>
			prevSelectedFeature && prevSelectedFeature.id === feature.id
				? null
				: feature
		);
	}

	function handleLongPress (event) {
onSelectPlace(event.geometry.coordinates)
	}

	return (
		<View style={styles.container}>
			<MapView style={styles.map} onLongPress={handleLongPress}>
				<Camera zoomLevel={15} centerCoordinate={coords} />
				<LocationPuck
					puckBearing="heading"
					puckBearingEnabled
					// pulsing={{ isEnabled: true, color: "#000000" }}
				/>
				<ShapeSource id="points" shape={geojson} onPress={onPinPress}>
					<SymbolLayer id="point-layer" source="points" style={styles.icon} />
				</ShapeSource>

				{selectedFeature && (
					<MarkerView coordinate={selectedFeature.geometry.coordinates}>
						<MarkerPopUp
							title={"this is"}
							message={selectedFeature?.properties?.title}
						/>
					</MarkerView>
				)}
			</MapView>
		</View>
	);
}

function MarkerPopUp({ title, message }) {
	return (
		<View style={styles.calloutContainerStyle}>
			<Text style={styles.customCalloutText}>{title}</Text>
			<Text style={styles.customCalloutText}>{message}</Text>
			<Button title={"take me here"}></Button>
		</View>
	);
}
