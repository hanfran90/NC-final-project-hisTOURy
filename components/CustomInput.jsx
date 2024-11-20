import React, { useState } from "react";
import { TextInput } from "react-native";

export default function CustomInput({ onChange }) {
	const [value, setValue] = useState('');

	return (
		<TextInput
			className="p-2 border"
			onChangeText={(text) => {
				setValue(text);
				onChange(text);
			}}
			value={value}
		/>
	);
}
