import { Link } from "expo-router";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import UserVoteCard from "../../../components/UserVoteCard";
import useUserVotedMarkers from "../../../hooks/useUserVotedMarkers";

export default function MyVotes() {
  const { data: likedMarkers } = useUserVotedMarkers();
  console.log(likedMarkers);

  if (!likedMarkers || likedMarkers.length === 0) {
    return (
      <View className="m-4 min-h-[100] flex justify-center content-center rounded-xl bg-white">
        <Text className="text-lg text-center p-6 font-semibold text-gray-900 dark:text-gray-100">
          It looks like you haven't voted on any markers yet...
        </Text>
        <Text className="text-lg text-center pb-6 pl-6 pr-6 font-semibold text-gray-900 dark:text-gray-100">
          Explore the map and start voting on markers to make your voice heard!
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 px-4 py-6 bg-gray-100 dark:bg-gray-800">
      <FlatList
        data={likedMarkers}
        keyExtractor={(item) => item.marker_id.toString()}
        renderItem={({ item }) => (
          <Link href={`/user-profile/${item.marker_id}`} asChild>
            <TouchableOpacity>
              <View className="flex-row bg-white dark:bg-gray-700 rounded-lg pl-4 mb-4 shadow-sm items-center">
                <View className="flex-1">
                  <Text className="text-base font-semibold text-gray-900 dark:text-gray-100">
                    {item.title}
                  </Text>
                  <Text className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Tap to view details or change your vote
                  </Text>
                </View>
                <View style={{ transform: [{ scale: 0.8 }] }}>
                  <UserVoteCard marker_id={item.marker_id} showText={false} />
                </View>
              </View>
            </TouchableOpacity>
          </Link>
        )}
      />
    </View>
  );
}
