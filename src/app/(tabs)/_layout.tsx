import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  const newMessage = false;
  // const [newMessage, setNewMessage] = useState(false);
  return (
    // maybe change active tint color
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#3b82f6",
        tabBarInactiveTintColor: "#9ca3af",
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "white",
          height: 70,
          elevation: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons size={focused ? 30 : 28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              size={focused ? 30 : 28}
              name="star-outline"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="likes"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              size={focused ? 30 : 28}
              name="favorite-outline"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          tabBarIcon: ({ color, focused }) => {
            if (newMessage) {
              return (
                <MaterialCommunityIcons
                  size={focused ? 30 : 28}
                  name="message-badge-outline"
                  color={color}
                />
              );
            } else {
              return (
                <MaterialCommunityIcons
                  size={focused ? 30 : 28}
                  name="message-outline"
                  color={color}
                />
              );
            }
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              size={focused ? 30 : 28}
              name="person"
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
