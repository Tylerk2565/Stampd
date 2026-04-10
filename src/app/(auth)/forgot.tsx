import {
  KeyboardAvoidingView,
  View,
  Text,
  TextInput,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useColors } from "@/hooks/use-colors";

export default function ForgotPassword() {
  const router = useRouter();
  const colors = useColors();

  const handleSendCode = async () => {
    // Implement
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-neutral-950">
      <KeyboardAvoidingView
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View className="flex-1 px-4">
            {/* Back */}
            <Pressable
              onPress={() => router.back()}
              accessibilityRole="button"
              accessibilityLabel="Go back"
              hitSlop={10}
              className="absolute top-2 left-4 z-10 w-11 h-11 rounded-full items-center justify-center"
            >
              <MaterialIcons
                name="arrow-back-ios"
                size={22}
                color={colors.iconMuted}
              />
            </Pressable>

            {/* Hero */}
            <View className="pt-24 px-5 items-center gap-2">
              <Text className="text-[40px] tracking-wide text-neutral-900 dark:text-white text-center">
                Forgot Password?
              </Text>
              <Text className="text-base text-neutral-500 dark:text-neutral-400 text-center">
                Enter your email or phone number and we'll send you a 5-digit
                verification code
              </Text>
            </View>

            {/* Card */}
            <View className="bg-white dark:bg-neutral-900 p-5 mt-6 rounded-2xl gap-3.5 shadow-sm">
              {/* Email / Phone */}
              <TextInput
                className="h-12 rounded-xl px-3.5 text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700"
                placeholder="Phone number or email"
                placeholderTextColor="#9ca3af"
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="emailAddress"
                autoComplete="email"
                keyboardType="email-address"
              />

              {/* Send Code */}
              <Pressable
                onPress={handleSendCode}
                disabled={false}
                accessibilityRole="button"
                accessibilityLabel="Send Code"
                className="bg-neutral-100 dark:bg-neutral-800 rounded-2xl py-3.5 items-center justify-center active:opacity-70"
              >
                <Text className="text-base text-neutral-900 dark:text-white">
                  Send Code
                </Text>
              </Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
