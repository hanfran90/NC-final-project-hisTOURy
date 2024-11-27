import { Stack } from "expo-router";
import React from "react";

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="my-spots" options={{ title: "My Markers" }} />
      <Stack.Screen name="my-votes" options={{ title: "My Votes" }} />
    </Stack>
  );
}
