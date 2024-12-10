import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import useUserVoteOnMarker from "../hooks/useUserVoteOnMarker";
import { MaterialIcons } from "@expo/vector-icons";

export default function UserVoteCard({
  marker_id,
  disabled = false,
  showText = true,
}) {
  const { addVote, canVote, vote, removeVote, updateVote, error, isPending } =
    useUserVoteOnMarker(marker_id);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    let timer;

    if (isPending && canVote) {
      timer = setTimeout(() => setIsloading(true), 1000);
    } else {
      setIsloading(false);
    }
    return () => clearTimeout(timer);
  }, [isPending, canVote]);

  const handleVote = (value) => {
    if (vote === value) return removeVote();
    if (vote) return updateVote(value);
    addVote(value);
  };

  const stars = [1, 2, 3, 4, 5];

  const renderUserStars = () => {
    return stars.map((star) => (
      <TouchableOpacity
        key={star}
        disabled={disabled}
        onPress={() => handleVote(star)}
        accessibilityLabel={`Rate ${star} stars`}
      >
        <MaterialIcons
          name={vote >= star ? "star" : "star-border"}
          size={32}
          style={vote >= star ? styles.starSelected : styles.starUnselected}
        />
      </TouchableOpacity>
    ));
  };

  return (
    <View>
      {isLoading && canVote && (
        <View>
          <Text className="text-center text-lg font-bold text-gray-800">
            Loading...
          </Text>
        </View>
      )}
      {(error.queryError || error.mutateError) && (
        <View>
          <Text className="text-center text-lg font-bold text-gray-800">
            Error: {error.queryError?.message || error.mutateError?.message}
          </Text>
        </View>
      )}
      {!canVote && (
        <View className="m-4 min-h-[100] flex justify-center content-center rounded-xl bg-white">
          <Text className="text-center text-lg font-bold text-gray-800">
            Please Login to Vote!
          </Text>
        </View>
      )}
      {canVote && (
        <View className="m-4 min-h-[100] flex justify-center content-center rounded-xl bg-white">
          {showText && (
            <Text className="text-center text-lg font-bold text-gray-800 pt-4">
              Your Star Rating
            </Text>
          )}
          <View className="flex justify-center" style={styles.starsContainer}>
            {renderUserStars()}
          </View>
          {showText && (
            <Text className="text-m text-center align-center pb-4">
              Click the stars to add your rating!
            </Text>
          )}
        </View>
      )}
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
