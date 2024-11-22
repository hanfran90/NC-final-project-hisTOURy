import { Text, TextInput, View, Button, TouchableOpacity } from "react-native";
import { useState } from "react";

export default function VoteCard({ castVote, disabled = false }) {
  const [voteCount, setVoteCount] = useState(1);

  function handleVote() {
    castVote(1);
    console.log("vote added");
  }

  return (
    <>
      <View className="m-4 mb-0 last-child:mb-4 p-4 min-h-[100] flex justify-center content-center rounded-xl bg-white">
        <Text className="text-center text-xl font-bold p-6">Vote Card</Text>
        <Text className="text-xl text-center p-5">{voteCount}</Text>
        <TouchableOpacity
          onPress={handleVote}
          title="Add 1 Vote"
          disabled={disabled}
          className="bg-orange-500 rounded-xl m-6 p-6"
        >
          <Text className="text-white text-center text-xl font-bold">
            Add 1 Vote
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleVote}
          title="Add 1 Vote"
          disabled={disabled}
          className="bg-orange-500 rounded-full h-20 w-20"
        >
          <Text className="text-white text-center text-5xl font-bold">+</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

//bring in the vote data
//display vote data
