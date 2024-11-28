import { Stack } from "expo-router";
import React from "react";

export default function _layout() {
  return (
    <Stack   screenOptions={{
      headerBackTitleVisible: false,
    }}>
      <Stack.Screen name="index" options={{ headerShown: false, title: ''}}  />
      <Stack.Screen
        name="theme"
        options={{
          title: "Theme",
        }}
      />
      <Stack.Screen
        name="on-this-day"
        options={{
          title: "On This Day",
        }}
      />
      <Stack.Screen
        name="top-routes"
        options={{
          title: "Top Routes",
        }}
      />
      <Stack.Screen
        name="new-spots"
        options={{
          title: "New Spots",
        }}
      />
    </Stack>
  );
}
