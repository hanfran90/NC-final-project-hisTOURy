import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { supabase } from "../utils/supabaseClient";

export default function planner() {
  const [data, setData] = useState(null);
  useEffect(() => {
    supabase
      .from("users_markers")
      .select()
      .then((response) => {
        setData(response.data);
      });
  }, []);
  return (
    <View>
      <Text>planner Page</Text>
      <Text>{JSON.stringify(data)}</Text>
    </View>
  );
}
