import { useReactQueryDevTools } from "@dev-plugins/react-query/build/useReactQueryDevTools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Link, Stack } from "expo-router";
import { Screen } from "expo-router/build/views/Screen";
import React from "react";
import "../global.css";

const queryClient = new QueryClient();

function _layout() {
  useReactQueryDevTools(queryClient);
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Screen
          name="(tabs)"
          options={{
            headerTitle: "Columbus",
            headerRight: () => <Link href={"/dev"}>DEV</Link>,
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}

export default _layout;
