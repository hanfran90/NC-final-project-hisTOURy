import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function AverageVoteCard({ avgVote, userVoteCount }) {
  const stars = [1, 2, 3, 4, 5];

  const renderAverageStars = (currentRating) => {
    return stars.map((star) => (
      <MaterialIcons
        key={star}
        name={currentRating >= star ? "star" : "star-border"}
        size={32}
        style={
          currentRating >= star ? styles.starSelected : styles.starUnselected
        }
      />
    ));
  };

  return (
    <View className="m-4 p-4 min-h-[100] flex justify-center content-center rounded-xl bg-white">
      <Text className="text-center text-lg font-bold text-gray-800 pt-2">
        Average Star Rating
      </Text>
      <View className="flex justify-center" style={styles.starsContainer}>
        {renderAverageStars(avgVote)}
        <Text className="text-sm text-center">({userVoteCount})</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 8,
  },
  starUnselected: {
    color: "#aaa",
  },
  starSelected: {
    color: "#ffb300",
  },
});
