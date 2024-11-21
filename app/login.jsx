import React, { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { supabase } from "../utils/supabaseClient";
import useUserSession from "../hooks/useUserSession";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { signUpUser } = useUserSession();

  async function signInWithEmail() {
    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert("Success", "Signed in successfully!");
    }
  }

  return (
    <View>
      <Text>Log In / Sign Up with Email</Text>
      <TextInput
        label="Email"
        leftIcon={{ type: "font-awesome", name: "envelope" }}
        placeholder="email@address.com"
        onChangeText={(text) =>
          setForm((prevState) => ({ ...prevState, email: text }))
        }
        value={form.email}
        autoCapitalize="none"
      />
      <TextInput
        label="Password"
        leftIcon={{ type: "font-awesome", name: "lock" }}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text) =>
          setForm((prevState) => ({ ...prevState, password: text }))
        }
        value={form.password}
        autoCapitalize="none"
      />
      {/* <Button title="Sign In" onPress={() => signUpUser(form)} /> */}
      <Button title="Create an Account" onPress={() => signUpUser(form)} />
    </View>
  );
}
