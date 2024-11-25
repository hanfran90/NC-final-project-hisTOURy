import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import useUserAddMarker from "../../../hooks/useUserAddMarker";
import CustomInput from "../../../components/CustomInput";
import InteractiveMap from "../../../components/InteractiveMap";

export default function AddSpot() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coordinates, setCoordinates] = useState([]);

  const [toggleMap, setToggleMap] = useState(false);

  const { data, isPending, error, mutate } = useUserAddMarker();

  useEffect(() => {
    console.log(JSON.stringify({ data, isPending, error }));
  }, [data, isPending, error]);

  function handleSubmit() {
    mutate({ title, description, coordinates });
  }

  return (
    <View className="w-full bg-white dark:bg-gray-700 rounded-lg shadow-md p-4">
      
      <CustomInput onChange={setTitle} label="Title:" />
      <CustomInput onChange={setDescription} label="Description:" />
      <Button
        title="Select from map"
        onPress={() => setToggleMap(!toggleMap)}
      />
      {toggleMap && (
        <View className="h-1/2">
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
       <TouchableOpacity
        className="bg-green-500 py-3 rounded-lg w-full mt-4"
        onPress={handleSubmit}
        >
       <Text className="text-white text-center font-semibold text-lg">Submit</Text>
     
       
        disabled={isPending || !title || !description || !coordinates}
        </TouchableOpacity>
      {data && <Text>Posted!</Text>}
    </View>
  );
}
