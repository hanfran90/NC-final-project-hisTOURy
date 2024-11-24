import { FlatList, Text } from "react-native";
import useUserProfile from "../hooks/useUserProfile";
import DevFeatureWrapper from "./DevFeatureWrapper";

export default function DevUserProfile() {
  const { data, isPending, error } = useUserProfile();

  return (
    <DevFeatureWrapper title="HOOK: User Profile">
      {isPending && <Text>Pending...</Text>}
      {error && <Text>{JSON.stringify(error)}</Text>}
      {data ? (
        <FlatList
          data={Object.entries(data)}
          renderItem={({ item: [key, val] }) => (
            <Text>
              {key}: {JSON.stringify(val)}
            </Text>
          )}
        />
      ) : (
        <Text>UNAUTHENICATED</Text>
      )}
    </DevFeatureWrapper>
  );
}
