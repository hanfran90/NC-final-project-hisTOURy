import { router } from "expo-router";
import { TouchableOpacity } from "react-native";
import { AuthContext } from "./Auth/AuthContext";
import { useContext } from "react";
import { Text } from "react-native";

export default function AddNewMarkerButton({ href = null, onPress }) {
  const { user } = useContext(AuthContext);
  const handlePress = () => {
    if (href) {
      router.navigate(href);
      return;
    }

    onPress();
  };

  if (!user) return null;
  return (
    <TouchableOpacity
      className="absolute size-[48] bg-slate-500 rounded-full flex justify-center items-center m-4 bottom-0 right-0"
      onPress={handlePress}
    >
      <Text className="text-center text-2xl font-bold text-white">+</Text>
    </TouchableOpacity>
  );
}
