import { Link, Redirect, useRouter } from "expo-router";
import { View, Text, StyleSheet, Button } from "react-native";
import useAuth from "../../../hooks/useAuth";
import { useEffect } from "react";

export default function Tab() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.replace("/login");
  }, [user]);

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
