import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import CustomInput from "../components/CustomInput";
import InteractiveMap from "../components/InteractiveMap";
import useAddMarker from "../hooks/useAddMarker";

export default function createMarker() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [coordinates, setCoordinates] = useState([])

  const [toggleMap, setToggleMap] = useState(false)


  const {data, isPending, mutate} = useAddMarker()

  function handleSubmit(){
   mutate({title, description, coordinates})
  }

	return (
		<View>
			<CustomInput onChange={setTitle} label="Title:"/>
      <CustomInput onChange={setDescription} label="Description:"/>
      <Button title="Select from map" onPress={()=>setToggleMap(!toggleMap)}/>
      {toggleMap && <View className="h-1/2">
      <InteractiveMap coords={[-2.243056, 53.477778]} distance={1000} onSelectPlace={setCoordinates} isInSelectMode/>
      </View>}
      <Text>{coordinates[0]}, {coordinates[1]}</Text>
      <Button title="submit" onPress={handleSubmit} disabled={isPending || !title || !description || !coordinates}/>
      {data && <Text>Posted!</Text>}
		</View>
	);
}
