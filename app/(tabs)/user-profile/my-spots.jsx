import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { Link } from "expo-router";
import useUserMarkers from "../../../hooks/useUsersMarkers";

export default function MySpots() {
  const { data: markers } = useUserMarkers();

  return (
    <View className="flex-1 px-4 py-6 bg-gray-100 dark:bg-gray-800">
      <FlatList
        data={markers}
        keyExtractor={(item) => item.marker_id.toString()}
        renderItem={({ item }) => (
          <Link href={`/user-profile/${item.marker_id}`} asChild>
            <TouchableOpacity>
              <View className="flex-row bg-white dark:bg-gray-700 rounded-lg p-4 mb-4 shadow-sm items-center">
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 8,
                    marginRight: 12,
                    backgroundColor: "#e2e2e2",
                  }}
                />
                <View className="flex-1">
                  <Text className="text-base font-semibold text-gray-900 dark:text-gray-100">
                    {item.title}
                  </Text>
                  <Text className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Address: {item.address}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </Link>
        )}
      />
    </View>
  );
}
