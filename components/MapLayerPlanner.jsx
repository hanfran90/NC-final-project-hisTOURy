import {
	Camera,
	Images,
	LineLayer,
	ShapeSource,
	SymbolLayer,
} from "@rnmapbox/maps";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { StyleSheet, Text } from "react-native";
import useUserPlanner from "../hooks/useUserPlanner";
import { mapboxInstance } from "../utils/mapboxInstance";

export default function MapLayerPlanner({ enable , userCoords}) {
	console.log({ enable });



	const {
		data: planner,
		isPending: gettingPlanner,
		error: errorPlanner,
	} = useUserPlanner();

	const {
		data: route,
		isPending: gettingRoute,
		error: errorRoute,
	} = useQuery({
		queryKey: ["user", "planner", "map"],
		queryFn: () => {
			console.log("fetching");
			const profile = "walking";
			const coords = planner[0].items
				.map(
					({ marker: { longitude, latitude } }) => longitude + "," + latitude
				)
				.join(";");

			return mapboxInstance
				.get(`/${profile}/${coords}`, {
					params: {
						alternatives: true,
						continue_straight: true,
						geometries: "geojson",
						language: "en",
						overview: "full",
						steps: true,
					},
				})
				.then((res) => res.data)
				.catch((e) => console.error(e));
		},
		enabled: Boolean(planner?.[0]) && enable,
	});

	if (gettingPlanner) return <Text>Getting Planner...</Text>;
	if (gettingRoute) return <Text>Getting Route...</Text>;
	if (errorPlanner || errorRoute)
		return <Text>ERROR: {JSON.stringify(errorPlanner || errorRoute)}</Text>;
	const centrePoint = Math.round(
		route.routes[0].geometry.coordinates.length / 2
	);
	

	const coordinates = route.routes[0].geometry.coordinates;
  if (!route || !coordinates) {
		return <Text>Loading...</Text>; 
	}

	const [minLng, minLat, maxLng, maxLat] = coordinates.reduce(
		([minLng, minLat, maxLng, maxLat], [lng, lat]) => [
			Math.min(minLng, lng),
			Math.min(minLat, lat),
			Math.max(maxLng, lng),
			Math.max(maxLat, lat),
		],
		[Infinity, Infinity, -Infinity, -Infinity]
	);

console.log(userCoords)
	return (
		<>
			{userCoords ? <Camera 
				
				centerCoordinate={[userCoords.longitude, userCoords.latitude]}
			/> : <Camera 
				bounds={{
					ne: [maxLng, maxLat],
					sw: [minLng, minLat],
				}}
				padding={{
					paddingTop: 50,
					paddingBottom: 50,
					paddingLeft: 50,
					paddingRight: 50,
				}}
				animationDuration={0}
				// centerCoordinate={coordinates[0]}
			/>  }
			
			<ShapeSource id="route" shape={route.routes[0].geometry}>
			<Images
					images={{
						green_triangle: require("../assets/maki--triangle32.png"),
					}}
				/>
				<LineLayer
					id="route-layer"
					style={{
						lineColor: "#03AA46",
						lineWidth: 5,
						lineOpacity: 0.8,
					}}
				/>
				<SymbolLayer
					id="arrowLayer"
					style={{
						iconImage: "green_triangle",
						iconSize: 0.5,
						iconRotate: 45,
						symbolPlacement: "line",
						iconAllowOverlap: true,
						symbolSpacing: 50,
					}}
				/>
			</ShapeSource>
		</>
	);
}
