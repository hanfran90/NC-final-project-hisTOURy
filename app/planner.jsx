import React, { useContext } from "react";
import { Animated, Button, PanResponder, StyleSheet } from "react-native";
import { FlatList, Text, View } from "react-native";
import { AuthContext } from "../components/Auth/AuthContext";
import useUserPlanner from "../hooks/useUserPlanner";
import { Link } from "expo-router";
import useDeleteMarkerPlanner from "../hooks/useDeleteMarkerPlanner";

export default function planner() {
	const { data, isPending, error } = useUserPlanner();
  useDeleteMarkerPlanner(4)


	if (isPending || error || !data) return null;

	return (
		<View style={styles.container}>
			{data[0].items.map((item) => {
				return (
          <View key={item.marker.marker_id} style={styles.item}>
					<Text style={styles.text}>
						{item.marker.title}
					</Text>
          <Button title="X"/>
          </View>
				);
			})}
      <Link href="/explore?route=show">View my route</Link>
		</View>
	);


}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "top",
		alignItems: "center",
		padding: 20,
		backgroundColor: "#f5f5f5",
	},
	item: {
		padding: 20,
		marginBottom: 10,
		borderRadius: 8,
		backgroundColor: "#fff",
		borderWidth: 1,
		borderColor: "#ccc",
	},
	text: {
		fontSize: 16,
	},
});
