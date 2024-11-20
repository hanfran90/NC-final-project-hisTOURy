import { Text, View } from "react-native";

export default function Card({ children = null, title }) {
  return (
    <View className="m-4 mb-0 last-child:mb-4 p-4 min-h-[100] flex justify-center content-center rounded-xl bg-white">
      {title && <Text className="text-center text-xl font-bold">{title}</Text>}
      {children}
    </View>
  );
}
