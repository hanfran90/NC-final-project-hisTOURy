import { useReactQueryDevTools } from "@dev-plugins/react-query/build/useReactQueryDevTools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Link, Stack } from "expo-router";
import { Screen } from "expo-router/build/views/Screen";
import React, { useEffect } from "react";
import "../global.css";
import { AppState } from "react-native";
import { supabase } from "../utils/supabaseClient";

const queryClient = new QueryClient();

function _layout() {
  AppState.addEventListener("change", (state) => {
    if (state === "active") {
      supabase.auth.startAutoRefresh();
    } else {
      supabase.auth.stopAutoRefresh();
    }
  });

  useReactQueryDevTools(queryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Screen
          name="(tabs)"
          options={{
            headerTitle: "Columbus",
            // headerRight: () => <Link href={"/dev"}>DEV</Link>,
            headerRight: () => <Link href={"/planner"}>PLANNER</Link>,
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
    </QueryClientProvider>
  );
}

export default _layout;
