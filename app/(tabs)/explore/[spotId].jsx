import { useLocalSearchParams } from "expo-router";
import { Button, Text, View } from "react-native";
import SingleMarkerCard from "../../../components/SingleMarkerCard";
import useMarkerInfo from "../../../hooks/useMarkerInfo";
import { supabase } from "../../../utils/supabaseClient";
import { useContext } from "react";
import { AuthContext } from "../../../components/Auth/AuthContext";
import VoteCard from "../../../components/VoteCard";
import useUserVote from "../../../hooks/useUserVote";

export default function SpotDetails() {
  const { spotId } = useLocalSearchParams();
  const { user } = useContext(AuthContext);
  const { data, isPending, error } = useMarkerInfo(spotId);
  const {
    mutate,
    isPending: isPendingMutation,
    error: mutationError,
  } = useUserVote();

  if (isPending) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View>
        <Text>No data available.</Text>
      </View>
    );
  }
  function handleOnPress() {
    return supabase
      .from("users_markers")
      .insert([{ user_id: user.id, marker_id: spotId }])
      .select()
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return (
    <View>
      {/* <Text>Page: Spot Details - {spotId}</Text> */}
      <SingleMarkerCard markerData={data} />
      <Button title="Add to planner" onPress={handleOnPress} />
      <VoteCard
        castVote={(value) => {
          mutate({ value, user_id: user.id, marker_id: spotId });
        }}
        disabled={!Boolean(user)}
      />
    </View>
  );
}
