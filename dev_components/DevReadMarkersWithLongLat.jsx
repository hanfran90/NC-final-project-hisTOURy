import React, { useState } from "react";
import DevFeatureWrapper from "./DevFeatureWrapper";
import { Button, FlatList, Text } from "react-native";
import { supabase } from "../utils/supabaseClient";

export default function DevReadMarkersWithLongLat() {
  const [data, setData] = useState(null);
  function handleFetch() {
    supabase
      .from("markers")
      .select("marker_id, longitude, latitude, location")
      .then((res) => setData(res.data));
  }

  return (
    <DevFeatureWrapper title="Read Markers With Long Lat">
      <Button title="Fetch" onPress={handleFetch} />
      <FlatList
        data={Object.entries(data ?? [])}
        renderItem={({ item: [key, val] }) => (
          <Text>
            {key}: {JSON.stringify(val)}
          </Text>
        )}
      />
    </DevFeatureWrapper>
  );
}
