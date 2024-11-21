import { View, Text, StyleSheet } from "react-native";

export default function MySpots() {
  return (
    <View style={styles.container}>
      <Text>Page: My Spots</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
