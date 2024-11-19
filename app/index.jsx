import React from "react";
import { Text } from "react-native";
import MapboxExample from "../components/MapboxExample";
import useCurrentLocation from "../hooks/useCurrentLocation";

function index() {
  const { location, error } = useCurrentLocation();

  return (
    <>
      <Text>{JSON.stringify(location || error)}</Text>
      <Text>Hello World</Text>
      <MapboxExample />
    </>
  );
}

export default index;
