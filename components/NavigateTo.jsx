import { router } from "expo-router";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";

export default function NavigateTo() {
  const handlePress = () => {
   
      router.navigate( "/explore?route=show&navigate=true");
      
    }



  return (
    <TouchableOpacity
      className="absolute size-[48] bg-slate-500 rounded-full flex justify-center items-center m-4 bottom-0 left-0"
      onPress={handlePress}
    >
      <Text className="text-center text-2xl font-bold text-white">Go</Text>
    </TouchableOpacity>
  );
}
