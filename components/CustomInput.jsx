import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";

export default function CustomInput({ onChange, label }) {
	const [value, setValue] = useState('');

	return (
    <View>
      <Text>{label}</Text>
		<TextInput
			className="p-2 border"
			onChangeText={(text) => {
				setValue(text);
				onChange(text);
			}}
			value={value}
		/>
    </View>
	);
}
