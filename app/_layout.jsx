import { useReactQueryDevTools } from "@dev-plugins/react-query/build/useReactQueryDevTools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Link, Stack } from "expo-router";
import { Screen } from "expo-router/build/views/Screen";
import React from "react";
import "../global.css";
import AuthProvider from "../components/Auth/AuthProvider";
import { BackgroundLayerStyle } from "@rnmapbox/maps";
import { colorScheme } from "nativewind";

const queryClient = new QueryClient();

function _layout() {
  useReactQueryDevTools(queryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Stack>
          <Screen
            name="(tabs)"
            options={{
              headerTitle: "hisTOURy",
              headerStyle: { backgroundColor: "seagreen" },
              headerTintColor: "white",
              headerRight: () => <Link href={"/planner"}>Planner</Link>,
            }}
          />
          <Screen
            name="login"
            options={{
              presentation: "modal",
            }}
          />
          <Screen
            name="planner"
            options={{
              presentation: "modal",
            }}
          />
        </Stack>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default _layout;
