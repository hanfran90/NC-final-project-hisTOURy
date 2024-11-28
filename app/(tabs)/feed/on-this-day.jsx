import React from "react";
import { Text, View, Image } from "react-native";

export default function OnThisDay() {
  return (
    <View className="flex-1 justify-center items-center bg-gray-100 dark:bg-gray-800 p-6">
      <Image
        source={require("../../../assets/8d3cf05e69602e0aa08453369a6543d6_t.jpeg")}
        style={{ width: 200, height: 200, marginBottom: 20 }}
      />
      <Text className="text-lg text-gray-700 dark:text-gray-300">
        Page: On This Day
      </Text>
      <Text className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        Today is Graduation Day!
      </Text>
    </View>
  );
}
