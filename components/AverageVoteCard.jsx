import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function VoteCard({ avgVote }) {
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
    <View className="m-1 p-1 min-h-0 flex justify-center items-center rounded-lg bg-white">
      <View style={styles.starsContainer}>{renderAverageStars(avgVote)}</View>
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
