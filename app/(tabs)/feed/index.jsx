import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Link } from "expo-router";
import useAllMarkers from "../../../hooks/useAllMarkers";
import Card from "../../../components/Card";

export default function Tab() {
  const { data: markers } = useAllMarkers();
  const latestMarkers =
    markers?.sort((a, b) => b.marker_id - a.marker_id).slice(0, 5) || [];

  return (
    <ScrollView className="flex-1 bg-gray-100 dark:bg-gray-800">
      <View className="items-center bg-white dark:bg-gray-700 p-6 shadow-md mb-6 rounded-b-lg">
        <Image
          source={require("../../../assets/8d3cf05e69602e0aa08453369a6543d6_t.jpeg")}
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            marginBottom: 15,
          }}
        />
        <Text className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
          Today is graduation day!
        </Text>
      </View>
      <View className="px-4 space-y-6">
        <Card title="Check Out the Latest Markers!">
          <FlatList
            data={latestMarkers}
            scrollEnabled={false}
            keyExtractor={(item) => item.marker_id.toString()}
            renderItem={({ item }) => (
              <Link href={`/feed/${item.marker_id}`} asChild>
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
        </Card>
      </View>
    </ScrollView>
  );
}
