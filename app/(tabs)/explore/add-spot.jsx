import { useEffect, useState } from "react";
import { Button, Text, View, TouchableOpacity } from "react-native";
import useUserAddMarker from "../../../hooks/useUserAddMarker";
import CustomInput from "../../../components/CustomInput";
import InteractiveMap from "../../../components/InteractiveMap";
import CustomButton from "../../../components/CustomButton";

export default function AddSpot() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coordinates, setCoordinates] = useState([]);

  const [toggleMap, setToggleMap] = useState(false);

  const { data, isPending, error, mutate } = useUserAddMarker();

  useEffect(() => {}, [data, isPending, error]);

  function handleSubmit() {
    mutate({ title, description, coordinates });
  }

  return (
    <View className="w-full bg-white dark:bg-gray-700 rounded-lg shadow-md p-4">
      <View className="w-full mb-4">
        <CustomInput onChange={setTitle} label="Title:" />
      </View>
      <View className="w-full mb-6">
        <CustomInput onChange={setDescription} label="Description:" />
      </View>
      {/* <Button
        title="Select from map"
        onPress={() => setToggleMap(!toggleMap)}
      /> */}
      <TouchableOpacity
        className="bg-blue-500 py-3 px-5 rounded-lg w-full mb-4"
        onPress={() => setToggleMap(!toggleMap)}
      >
        <Text className="text-white text-center font-semibold text-lg">
          {toggleMap ? "Close map" : "Select from map"}
        </Text>
      </TouchableOpacity>
      {toggleMap && (
        <View className="h-64 w-full mb-4 border border-gray-300 dark:border-gray-600 rounded-lg">
          <InteractiveMap
            coords={[-2.243056, 53.477778]}
            distance={1000}
            onSelectPlace={setCoordinates}
            isInSelectMode
          />
        </View>
      )}
      <Text>
        {coordinates[0]}, {coordinates[1]}
      </Text>

      <View className="w-full">
        <CustomButton
          title="Submit"
          onPress={handleSubmit}
          color="secondary"
          disabled={!title || !description || !coordinates.length}
        />
      </View>
      {data && (
        <Text className="text-green-600 dark:text-green-400 text-center mt-4">
          Spot added successfully!
        </Text>
      )}
    </View>
  );
}
