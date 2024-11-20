import { Stack } from "expo-router";
import React from "react";

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="[spotId]"
        options={{
          title: "Spot",
        }}
      />
      <Stack.Screen name="add-spot" options={{ title: "Add Spot" }} />
    </Stack>
  );
}
