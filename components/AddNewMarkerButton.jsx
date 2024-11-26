import { router } from "expo-router";
import { TouchableOpacity } from "react-native";
import { AuthContext } from "./Auth/AuthContext";
import { useContext } from "react";

export default function AddNewMarkerButton({ children, href = null, onPress }) {
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
      {children}
    </TouchableOpacity>
  );
}
