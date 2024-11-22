import React, { useState, useEffect, useContext } from "react";
import { Button, FlatList, Text, View } from "react-native";
import { supabase } from "../utils/supabaseClient";
import { AuthContext } from "../components/Auth/AuthContext";

export default function planner() {
  const { user } = useContext(AuthContext);
  l;
  const [profile, setProfile] = useState({});

  useEffect(() => {
    if (user)
      supabase
        .from("profiles")
        .select("user_id, planner:users_markers!inner(markers(*))")
        .eq("user_id", user.id)
        .then((res) => {
          setProfile(res.data[0]);
        });
  }, [user]);

  return (
    <View>
      <Text>planner Page</Text>
      <FlatList
        data={profile.planner}
        renderItem={({ item: { markers }, index }) => (
          <Text>
            {index}: {JSON.stringify(markers)}
          </Text>
        )}
      />
    </View>
  );
}
