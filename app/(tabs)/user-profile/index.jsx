import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../../../components/Auth/AuthContext";
import CustomButton from "../../../components/CustomButton";

export default function Tab() {
  const { user, signOut } = useContext(AuthContext);

  return (
    <View className="flex-1 justify-center items-center bg-gray-50 dark:bg-gray-900 p-6 space-y-6">
      <View className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5">
        <Text className="text-center text-xl font-bold text-gray-800 dark:text-gray-100">
          Welcome{" "}
          <Text className="text-gray-800">
            {user?.email.split("@")[0].charAt(0).toUpperCase() +
              user?.email.split("@")[0].slice(1)}
          </Text>
          !
        </Text>
      </View>

      <View className="w-full">
        <View className="mt-4">
          <Link href="/user-profile/my-spots" asChild>
            <TouchableOpacity className="bg-green-600 hover:bg-green-700 py-4 rounded-lg shadow-md">
              <Text className="text-center text-white font-medium text-lg">
                My Markers
              </Text>
            </TouchableOpacity>
          </Link>
        </View>

        <View className="mt-4">
          <Link href="/user-profile/my-votes" asChild>
            <TouchableOpacity className="bg-blue-600 hover:bg-blue-700 py-4 rounded-lg shadow-md">
              <Text className="text-center text-white font-medium text-lg">
                My Votes
              </Text>
            </TouchableOpacity>
          </Link>
        </View>

        <View className="mt-4">
          <CustomButton
            title="Logout"
            onPress={signOut}
            color="tertiary"
            style="bg-red-500 hover:bg-red-600 py-4 rounded-lg shadow-md"
          />
        </View>
      </View>
    </View>
  );
}
