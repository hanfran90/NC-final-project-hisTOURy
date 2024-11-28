import { useReactQueryDevTools } from "@dev-plugins/react-query/build/useReactQueryDevTools";
import { FontAwesome6 } from "@expo/vector-icons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, useRouter } from "expo-router";
import { Screen } from "expo-router/build/views/Screen";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import AuthProvider from "../components/Auth/AuthProvider";
import "../global.css";

const queryClient = new QueryClient();

function _layout() {
  useReactQueryDevTools(queryClient);
  const router = useRouter();

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
              headerRight: () => (
                <TouchableOpacity
                  className="flex justify-center items-center flex-column p-3"
                  onPress={() => router.push("/planner")}
                >
                  <FontAwesome6 size={24} name="route" />
                  {/* <Text className="font-bold">Planner</Text> */}
                </TouchableOpacity>
              ),
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
