import React, { useContext } from "react";
import { FlatList, Text, View } from "react-native";
import { AuthContext } from "../components/Auth/AuthContext";
import useUserPlanner from "../hooks/useUserPlanner";

export default function planner() {
  const { user } = useContext(AuthContext);
  const { data: planner } = useUserPlanner(user.id);

  console.log({ user, planner });

  return (
    <View>
      <Text>planner Page</Text>
      <FlatList
        data={planner}
        renderItem={({ item: { markers }, index }) => (
          <Text>
            {index}: {JSON.stringify(markers)}
          </Text>
        )}
      />
    </View>
  );
}
