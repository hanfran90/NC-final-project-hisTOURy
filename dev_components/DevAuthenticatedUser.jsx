import { FlatList, Text, View } from "react-native";
import useAuth from "../hooks/useAuth";
import DevFeatureWrapper from "./DevFeatureWrapper";
import { useEffect } from "react";

export default function DevAuthenticatedUser() {
  const { user, error, isPending } = useAuth();

  return (
    <DevFeatureWrapper title="Authenticated User">
      {isPending && <Text>Pending...</Text>}
      {error && <Text>{JSON.stringify(error)}</Text>}
      {user ? (
        <FlatList
          data={Object.entries(user)}
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
