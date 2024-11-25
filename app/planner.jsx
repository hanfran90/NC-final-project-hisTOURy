import React, { useContext } from "react";
import { FlatList, Text, View } from "react-native";
import useUserPlanner from "../hooks/useUserPlanner";

export default function planner() {
  const { data: planner } = useUserPlanner();

  // console.log({ user, planner });
  console.log({ planner });

  return (
    <View>
      <Text>planner Page</Text>
      <FlatList
        data={planner}
        renderItem={({ item: { items }, index }) => (
          <Text>
            {index}: {JSON.stringify(items)}
          </Text>
        )}
      />
    </View>
  );
}
