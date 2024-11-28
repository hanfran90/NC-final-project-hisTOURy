import { router } from "expo-router";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";

export default function NavigateTo({ isInNavMode }) {
  const handlePress = () => {
    router.navigate(
      isInNavMode ? "/explore" : "/explore?route=show&navigate=true"
    );
  };

  return (
    <TouchableOpacity
      className="absolute size-[48] rounded-full flex justify-center items-center m-4 bottom-0 left-0"
      onPress={handlePress}
      style={{ backgroundColor: "black" }}
    >
      <Text className="text-center text-2xl font-bold text-white">
        {isInNavMode ? "X" : "Go"}
      </Text>
    </TouchableOpacity>
  );
}
