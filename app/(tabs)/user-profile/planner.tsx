import { View, Text, StyleSheet } from "react-native";

export default function Planner() {
  return (
    <View style={styles.container}>
      <Text>Page: My Planner</Text>
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
