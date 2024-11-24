import { FlatList, Text } from "react-native";
import useUserPlanner from "../hooks/useUserPlanner";
import DevFeatureWrapper from "./DevFeatureWrapper";

export default function DevUserPlanner() {
  const { data, isPending, error } = useUserPlanner();

  return (
    <DevFeatureWrapper title="HOOK: User Planner">
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
