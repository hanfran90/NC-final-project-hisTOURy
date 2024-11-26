import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import useUserVoteOnMarker from "../hooks/useUserVoteOnMarker";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect } from "react";
import useUserVoteCount from "../hooks/useUserVoteCount";

export default function VoteCard({ user, votes, marker_id, disabled = false }) {
  const { addVote, canVote, vote, removeVote, updateVote, error, isPending } =
    useUserVoteOnMarker(marker_id);
  // console.log(vote);
  const response = useUserVoteCount();
  console.log(response);

  const averageStarRating = votes / 5;
  // console.log(averageStarRating);
  const stars = [1, 2, 3, 4, 5];

  useEffect(() => {
    if (user && !vote && canVote) {
      addVote(1);
    }
  }, [user, vote, canVote, addVote]);

  const renderAverageStars = (currentRating) => {
    // console.log(currentRating);
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

  const renderUserStars = () => {
    return stars.map((star) => (
      <TouchableOpacity
        key={star}
        disabled={disabled}
        onPress={() => updateVote(star)}
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
    <View className="m-4 p-4 min-h-[100] flex justify-center content-center rounded-xl bg-white">
      <Text className="text-center text-lg font-bold text-gray-800 pt-4">
        Average Star Rating
      </Text>
      <View className="flex justify-center" style={styles.starsContainer}>
        {renderAverageStars(averageStarRating)}
        <Text>({votes})</Text>
      </View>

      {user && (
        <>
          <Text className="text-center text-lg font-bold text-gray-800 pt-6">
            Your Star Rating
          </Text>
          <View className="flex justify-center" style={styles.starsContainer}>
            {renderUserStars()}
          </View>
          <Text className="text-sm text-center pb-4">
            Click the stars to add your rating!
          </Text>
        </>
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

// const userName =
// user?.email.split("@")[0].charAt(0).toUpperCase() +
// user?.email.split("@")[0].slice(1) +
// "'s";

// if (!user) {
//   return (
//     <View className="m-4 mb-0 last-child:mb-4 p-4 min-h-[100] flex justify-center content-center rounded-xl bg-white">
//       <Text className="text-center text-lg font-bold text-gray-800">
//         Average Star Rating
//       </Text>
//       <View className="flex justify-center" style={styles.starsContainer}>
//         {renderStars(averageStarRating)}
//         <Text>({votes})</Text>
//       </View>
//       <Text className="text-center text-orange-500">
//         Please log in to leave a star review!
//       </Text>
//     </View>
//   );
// }

// return (
//   <View className="m-4 mb-0 last-child:mb-4 p-4 min-h-[100] flex justify-center content-center rounded-xl bg-white">
//     <Text className="text-center text-lg font-bold text-gray-800 p-2">
//       {userName} Star Rating
//     </Text>
//     <View className="flex justify-center p-1" style={styles.starsContainer}>
//       {stars.map((star) => (
//         <TouchableOpacity
//           key={star}
//           onPress={() => {
//             vote ? updateVote(star) : addVote(star);
//           }}
//           disabled={disabled}
//         >
//           <MaterialIcons
//             name={vote >= star ? "star" : "star-border"}
//             size={32}
//             style={vote >= star ? styles.starSelected : styles.starUnselected}
//           />
//         </TouchableOpacity>
//       ))}
//     </View>
//     <View>
//       <TouchableOpacity
//         onPress={removeVote}
//         disabled={disabled}
//         className="bg-orange-500 rounded-xl m-1 p-1"
//       >
//         <Text className="text-white text-center text-xl font-bold">
//           Reset Vote
//         </Text>
//       </TouchableOpacity>
//     </View>
//     <View className="m-4 mb-0 last-child:mb-4 p-4 min-h-[100] flex justify-center content-center rounded-xl bg-white">
//       <Text className="text-center text-lg font-bold text-gray-800">
//         Average Star Rating
//       </Text>
//       <View className="flex justify-center" style={styles.starsContainer}>
//         {renderStars(averageStarRating)}
//         <Text>({votes})</Text>
//       </View>
//     </View>
//   </View>
// );

//   if (!user) {
//     return (
//       <View className="m-4 mb-0 last-child:mb-4 p-4 min-h-[100] flex justify-center content-center rounded-xl bg-white">
//         <Text className="text-center text-lg font-bold text-gray-800">
//           Average Star Rating
//         </Text>
//         <View className="flex justify-center" style={styles.stars}>
//           <MaterialIcons
//             name={averageStarRating >= 1 ? "star" : "star-border"}
//             size={32}
//             style={styles.starSelected}
//           />
//           <MaterialIcons
//             name={averageStarRating >= 2 ? "star" : "star-border"}
//             size={32}
//             style={styles.starSelected}
//           />
//           <MaterialIcons
//             name={averageStarRating >= 3 ? "star" : "star-border"}
//             size={32}
//             style={styles.starSelected}
//           />
//           <MaterialIcons
//             name={averageStarRating >= 4 ? "star" : "star-border"}
//             size={32}
//             style={styles.starSelected}
//           />
//           <MaterialIcons
//             name={averageStarRating >= 5 ? "star" : "star-border"}
//             size={32}
//             style={styles.starSelected}
//           />
//           <Text>({votes})</Text>
//         </View>
//         <Text className="text-center text-lg font-bold text-gray-400">
//           Please login to leave a star review!
//         </Text>
//       </View>
//     );
//   }

// return (
//   <View className="m-4 mb-0 last-child:mb-4 p-4 min-h-[100] flex justify-center content-center rounded-xl bg-white">
//     <Text className="text-center text-lg font-bold text-gray-800 p-2">
//       {userName} Star Rating
//     </Text>
//     <View className="flex justify-center p-1" style={styles.stars}>
//       <TouchableOpacity
//         onPress={() => {
//           vote ? updateVote(1) : addVote(1);
//         }}
//       >
//         <MaterialIcons
//           name={vote >= 1 ? "star" : "star-border"}
//           size={32}
//           style={vote >= 1 ? styles.starSelected : styles.starUnselected}
//         />
//       </TouchableOpacity>
//       <TouchableOpacity
//         onPress={() => {
//           vote ? updateVote(2) : addVote(2);
//         }}
//       >
//         <MaterialIcons
//           name={vote >= 2 ? "star" : "star-border"}
//           size={32}
//           style={vote >= 2 ? styles.starSelected : styles.starUnselected}
//         />
//       </TouchableOpacity>
//       <TouchableOpacity
//         onPress={() => {
//           vote ? updateVote(3) : addVote(3);
//         }}
//       >
//         <MaterialIcons
//           name={vote >= 3 ? "star" : "star-border"}
//           size={32}
//           style={vote >= 3 ? styles.starSelected : styles.starUnselected}
//         />
//       </TouchableOpacity>
//       <TouchableOpacity
//         onPress={() => {
//           vote ? updateVote(4) : addVote(4);
//         }}
//       >
//         <MaterialIcons
//           name={vote >= 4 ? "star" : "star-border"}
//           size={32}
//           style={vote >= 4 ? styles.starSelected : styles.starUnselected}
//         />
//       </TouchableOpacity>
//       <TouchableOpacity
//         onPress={() => {
//           vote ? updateVote(5) : addVote(5);
//         }}
//       >
//         <MaterialIcons
//           name={vote >= 5 ? "star" : "star-border"}
//           size={32}
//           style={vote >= 5 ? styles.starSelected : styles.starUnselected}
//         />
//       </TouchableOpacity>
//     </View>
//     <View>
//       <TouchableOpacity
//         onPress={() => {
//           removeVote();
//         }}
//         title="Remove vote"
//         disabled={disabled}
//         className="bg-orange-500 rounded-xl m-1 p-1"
//       >
//         <Text className="text-white text-center text-xl font-bold">
//           Reset Vote
//         </Text>
//       </TouchableOpacity>
//     </View>
//     <View className="m-4 mb-0 last-child:mb-4 p-4 min-h-[100] flex justify-center content-center rounded-xl bg-white">
//       <Text className="text-center text-lg font-bold text-gray-800">
//         Average Star Rating
//       </Text>
//       <View className="flex justify-center" style={styles.stars}>
//         <MaterialIcons
//           name={averageStarRating >= 1 ? "star" : "star-border"}
//           size={32}
//           style={styles.starSelected}
//         />
//         <MaterialIcons
//           name={averageStarRating >= 2 ? "star" : "star-border"}
//           size={32}
//           style={styles.starSelected}
//         />
//         <MaterialIcons
//           name={averageStarRating >= 3 ? "star" : "star-border"}
//           size={32}
//           style={styles.starSelected}
//         />
//         <MaterialIcons
//           name={averageStarRating >= 4 ? "star" : "star-border"}
//           size={32}
//           style={styles.starSelected}
//         />
//         <MaterialIcons
//           name={averageStarRating >= 5 ? "star" : "star-border"}
//           size={32}
//           style={styles.starSelected}
//         />
//         <Text>({votes})</Text>
//       </View>
//     </View>
//   </View>
// );
