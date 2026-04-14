import { useColors } from "@/hooks/use-colors";
import { supabase } from "@/lib/supabase";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import { signInWithProvider } from "@/lib/auth";
import { StatusBar } from "expo-status-bar";

export default function CreateAccountPage() {
  const router = useRouter();
  const colors = useColors();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);

  // check if inputs are valid via regex or I can use zod
  // check if user already exists in supabase db, return error if exists
  // create user if inputs are valid
  // work on authstate, tokens, jwt, etc for after creating account

  // handle consent as well

  async function handleCreateAccount() {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        Alert.alert(error.message);
      } else {
        router.replace("/(onboarding)/step1-basic");
      }
    } catch (error) {
      Alert.alert("Unexpected error", "Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-neutral-950">
      <StatusBar style="auto" />
      <KeyboardAvoidingView className="flex-1">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View className="flex-1 px-4">
            {/* Back Button */}
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
              <Text className="text-5xl tracking-wide text-neutral-900 dark:text-white">
                Stamp'd
              </Text>
              <Text className="text-base text-neutral-500 dark:text-neutral-400">
                Create your account
              </Text>
            </View>

            {/* Card */}
            <View className="bg-white dark:bg-neutral-900 p-5 mt-6 rounded-2xl gap-3.5 shadow-sm">
              {/* Email */}
              <TextInput
                className="h-12 rounded-xl px-3.5 text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700"
                placeholder="Email"
                placeholderTextColor="#9ca3af"
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="emailAddress"
                autoComplete="email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />

              {/* Password */}
              <View className="relative">
                <TextInput
                  className="h-12 rounded-xl px-3.5 pr-12 text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700"
                  placeholder="Password"
                  placeholderTextColor="#9ca3af"
                  secureTextEntry={!showPassword}
                  textContentType="newPassword"
                  value={password}
                  onChangeText={setPassword}
                />
                <Pressable
                  onPress={() => setShowPassword((s) => !s)}
                  accessibilityRole="button"
                  accessibilityLabel={
                    showPassword ? "Hide password" : "Show password"
                  }
                  hitSlop={10}
                  className="absolute right-2.5 top-2.5 w-7 h-7 rounded-full items-center justify-center"
                >
                  <MaterialIcons
                    name={showPassword ? "visibility-off" : "visibility"}
                    size={22}
                    color={colors.iconMuted}
                  />
                </Pressable>
              </View>

              {/* Consent */}
              <Pressable
                onPress={() => setConsent((c) => !c)}
                accessibilityRole="checkbox"
                className="flex-row items-center justify-center gap-2 mt-0.5"
              >
                <MaterialIcons
                  name={consent ? "check-box" : "check-box-outline-blank"}
                  size={20}
                  color="#3b82f6"
                />
                <Text className="text-sm text-neutral-900 dark:text-white">
                  I'm 18+ and agree to{" "}
                  <Link
                    href="/(legal)/terms"
                    className="text-blue-500 dark:text-blue-400"
                  >
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/(legal)/privacy"
                    className="text-blue-500 dark:text-blue-400"
                  >
                    Privacy
                  </Link>
                </Text>
              </Pressable>

              {/* Divider */}
              <View className="h-px bg-neutral-200 dark:bg-neutral-700 my-1" />

              {/* Create Account */}
              <Pressable
                onPress={handleCreateAccount}
                disabled={loading}
                accessibilityRole="button"
                accessibilityLabel="Create account"
                className="bg-neutral-100 dark:bg-neutral-800 rounded-2xl py-3.5 items-center justify-center active:opacity-70"
              >
                <Text className="text-base text-neutral-900 dark:text-white">
                  {loading ? "Creating account…" : "Create Account"}
                </Text>
              </Pressable>

              {/* OR divider */}
              <View className="flex-row items-center my-1">
                <View className="flex-1 h-px bg-neutral-200 dark:bg-neutral-700" />
                <Text className="mx-2 text-neutral-500 dark:text-neutral-400">
                  or sign up with
                </Text>
                <View className="flex-1 h-px bg-neutral-200 dark:bg-neutral-700" />
              </View>

              {/* Social sign-up */}
              <View className="flex-row justify-center gap-9 mt-1">
                <Pressable
                  // onPress={() => signInWithProvider("google")}
                  accessibilityRole="button"
                  accessibilityLabel="Continue with Google"
                  hitSlop={8}
                  className="w-15 h-15 items-center justify-center shadow-sm active:opacity-70"
                >
                  <FontAwesome name="google" size={24} color={colors.icon} />
                </Pressable>

                <Pressable
                  // onPress={() => signInWithProvider("facebook")}
                  accessibilityRole="button"
                  accessibilityLabel="Continue with Facebook"
                  hitSlop={8}
                  className="w-15 h-15 items-center justify-center shadow-sm active:opacity-70"
                >
                  <FontAwesome name="facebook" size={24} color={colors.icon} />
                </Pressable>

                <Pressable
                  // onPress={() => signInWithProvider("apple")}
                  accessibilityRole="button"
                  accessibilityLabel="Continue with Apple"
                  hitSlop={8}
                  className="w-15 h-15 items-center justify-center shadow-sm active:opacity-70"
                >
                  <FontAwesome name="apple" size={24} color={colors.icon} />
                </Pressable>
              </View>

              {/* Footer */}
              <View className="items-center mt-5 pb-3">
                <Text className="text-sm text-neutral-900 dark:text-white">
                  Already have an account?{" "}
                  <Text
                    accessibilityRole="link"
                    className="text-blue-500 dark:text-blue-400"
                    onPress={() => router.replace("/(auth)/sign-in")}
                  >
                    Sign in
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
