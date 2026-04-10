import { Stack } from "expo-router";

export default function MessagesStack() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="messages" />
      <Stack.Screen name="[chatId]" />
    </Stack>
  )
}