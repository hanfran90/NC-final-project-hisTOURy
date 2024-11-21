import { Link, Redirect, useNavigation } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

import { useContext, useEffect } from "react";
import { AuthContext } from "../../../components/Auth/AuthContext";

export default function Tab() {
  const { user, signOut } = useContext(AuthContext);

  const navigation = useNavigation();

  useEffect(() => {
    if (!user) navigation.navigate("login");
  }, []);

  return user ? (
    <View style={styles.container}>
      <Text>User Profile</Text>
      <Link href="/user-profile/my-spots">My Spots</Link>
      <Button title="Logout" onPress={signOut} />
    </View>
  ) : (
    <Link href="/login">Login First</Link>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
