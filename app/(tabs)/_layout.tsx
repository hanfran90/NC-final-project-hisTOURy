import { FontAwesome6 } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { Screen } from "expo-router/build/views/Screen";
import { useContext } from "react";
import { AuthContext } from "../../components/Auth/AuthContext";

export default function _layout() {
  const { user } = useContext(AuthContext);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "black",
        tabBarInactiveBackgroundColor: "seagreen",
        tabBarStyle: {
          // height: 60,
          borderWidth: 2,
          borderRadius: 1,
          borderColor: "seagreen",
          borderTopColor: "seagreen",
          backgroundColor: "seagreen",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          href: null,
        }}
      />
      <Screen
        name="feed"
        options={{
          headerShown: false,
          title: "Feed",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 size={28} name={"bars-staggered"} color={color} />
          ),
        }}
      />
      <Screen
        name="explore"
        options={{
          headerShown: false,
          title: "Explore",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name={"map"} color={color} />
          ),
        }}
      />
      {user ? (
        <Screen
          name="user-profile"
          options={{
            title: "User",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name={"user"} color={color} />
            ),
          }}
        />
      ) : (
        <Screen
          name="user-profile"
          options={{
            title: "My Profile",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name={"user"} color={color} />
            ),
            href: "/login",
          }}
        />
      )}
    </Tabs>
  );
}

{
  /* <Tabs
  screenOptions={{
    tabBarActiveTintColor: Colors.orange.default,
    tabBarStyle: {
      height: 70,
      borderWidth: 1,
      borderRadius: 50,
      borderColor: Colors.orange.default,
      borderTopColor: Colors.orange.default,
      backgroundColor: Colors.white.default,
    },
    tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: "bold",
      marginBottom: 10,
    },
  }}
>
  <Tabs.Screen
    name="(HomeNav)"
    options={{
      title: "Home",
      headerShown: false,
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="ios-home" size={size} color={color} />
      ),
    }}
  />
</Tabs>; */
}
