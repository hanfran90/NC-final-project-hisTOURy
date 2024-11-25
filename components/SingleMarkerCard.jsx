import { Text, View, Image } from "react-native";


export default function SingleMarkerCard({ markerData }) {
  return (
    <>
      <View className="m-4 p-4 rounded-xl bg-white shadow-sm space-y-4">
        {markerData.title && (
          <Text className="text-center text-3xl font-extrabold text-gray-800">
            {markerData.title}
          </Text>
        )}
      </View>
      <View>
        <View className="m-4 mb-0 last-child:mb-4 p-4 min-h-[100] flex justify-center content-center rounded-xl bg-white">
          <Text>
            {markerData.photo} There will be nice photo from Hannah and Georgia
          </Text>
          <Image
            source={{
              uri: "https://www.dfc.co.uk/wp-content/uploads/2018/09/MTC-Oxford-House_taken-by-NS_0869.png",
            }}
            className="m-4 h-40 rounded-xl"
          />
        </View>
        <Text className="text-gray-600 text-base font-medium mb-2">
          {markerData.address} Address: should be here
        </Text>
        <Text className="text-gray-700 text-sm">
          {markerData.description} Description: should be here
        </Text>
      </View>
    </>
  );
}
