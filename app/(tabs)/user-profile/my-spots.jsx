import { View, Text, StyleSheet } from "react-native";

export default function MySpots() {
  return (
    <View style={styles.container}>
      <Text>Page: My Spots</Text>
      <Text>my marker 1</Text>
      <Text>my marker 2</Text>
      <Text>my marker 3</Text>
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
