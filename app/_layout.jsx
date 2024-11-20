import { useReactQueryDevTools } from "@dev-plugins/react-query/build/useReactQueryDevTools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import React from "react";
import "../global.css";
import { Screen } from "expo-router/build/views/Screen";

const queryClient = new QueryClient();

function _layout() {
  useReactQueryDevTools(queryClient);
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Screen name="(tabs)" options={{ headerTitle: "Columbus" }} />
        {/* <Screen
          name="login"
          options={{
            presentation: "modal",
          }}
        /> */}
      </Stack>
    </QueryClientProvider>
  );
}

export default _layout;
