import { Link } from "expo-router";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import AverageVoteCard from "../../../components/AverageVoteCard";
import useUserMarkerVotes from "../../../hooks/useUserMarkerVotes";

export default function MyVotes() {
  const { data: likedMarkers } = useUserMarkerVotes();

  return (
    <View className="flex-1 px-4 py-6 bg-gray-100">
      <FlatList
        data={likedMarkers}
        keyExtractor={(item) => item.marker_id.toString()}
        renderItem={({ item }) => (
          <Link href={`/user-profile/${item.marker_id}`} asChild>
            <TouchableOpacity>
              <View className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-4 mb-4">
                <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {item.title}
                </Text>
                <Text className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                  Votes: {item.avg_vote}/5
                </Text>
                <AverageVoteCard avgVote={item.avg_vote} />
              </View>
            </TouchableOpacity>
          </Link>
        )}
      />
    </View>
  );
}
