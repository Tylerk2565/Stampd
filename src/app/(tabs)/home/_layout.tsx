import { Stack } from "expo-router";

export default function HomeStack() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" />
      <Stack.Screen name="preferences" />
      <Stack.Screen name="settings" />
    </Stack>
  )
}