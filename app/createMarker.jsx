import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import CustomInput from "../components/CustomInput";
import InteractiveMap from "../components/InteractiveMap";
import useAddMarker from "../hooks/useAddMarker";

export default function createMarker() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [coordinates, setCoordinates] = useState([])

  const {data, isPending, mutate} = useAddMarker()

  function handleSubmit(){
   mutate({title, description, coordinates})
  }

	return (
		<View>
			<Text>Create a new marker</Text>
      <View className="h-1/2">
      <InteractiveMap coords={[-2.243056, 53.477778]} distance={1000} onSelectPlace={setCoordinates}/>
      </View>
      <Text>{coordinates[0]}, {coordinates[1]}</Text>
      <Text>{JSON.stringify(data)}</Text>
			<CustomInput onChange={setTitle}/>
      <CustomInput onChange={setDescription}/>
      <Button title="submit" onPress={handleSubmit} disabled={isPending || !title || !description || !coordinates}/>
		</View>
	);
}
