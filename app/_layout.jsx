import { useReactQueryDevTools } from "@dev-plugins/react-query/build/useReactQueryDevTools";
import { QueryClient } from "@tanstack/react-query";
import { Slot } from "expo-router";
import React from "react";
import { View } from "react-native";

const queryClient = new QueryClient();

function _layout() {
  useReactQueryDevTools(queryClient);
  return (
    <View>
      <Slot />
    </View>
  );
}

export default _layout;
