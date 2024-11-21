import { Link, Redirect } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

import { useContext } from "react";
import { AuthContext } from "../../../components/Auth/AuthContext";

export default function Tab() {
  const { user, signOut } = useContext(AuthContext);

  if (!user) return <Redirect href="/login" />;

  return (
    <View style={styles.container}>
      <Text>User Profile</Text>
      <Link href="/user-profile/my-spots">My Spots</Link>
      <Button title="Logout" onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
