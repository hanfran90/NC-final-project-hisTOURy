import { Text, TextInput, View } from "react-native";

export default function SingleMarkerCard({ markerData }) {
  console.log(markerData);
  return (
    <>
    <View className="m-4 mb-0 last-child:mb-4 p-4 min-h-[100] flex justify-center content-center rounded-xl bg-white">
      {markerData.title && (
        <Text className="text-center text-xl font-bold">
          {markerData.title}
        </Text>
      )}
    </View>
    <View>
          <Text>{markerData.address} Address: should be here</Text>
          <Text>{markerData.description} Description: should be here</Text>
    </View>
    </>
  );
}
