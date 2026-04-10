import {
  KeyboardAvoidingView,
  View,
  Text,
  TextInput,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useRouter, Link } from "expo-router";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { supabase } from "@/lib/supabase";
import { useColors } from "@/hooks/use-colors";
import { StatusBar } from "expo-status-bar";
// import { signInWithProvider } from "@/lib/auth";

export default function SignInPage() {
  const router = useRouter();
  const colors = useColors();

  const [showPw, setShowPw] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      router.replace("/(tabs)/home/home")
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-neutral-950">
      <StatusBar style="auto" />
      <KeyboardAvoidingView className="flex-1">
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
              <Text className="text-5xl tracking-wide text-neutral-900 dark:text-white">
                Stamp'd
              </Text>
              <Text className="text-base text-neutral-500 dark:text-neutral-400">
                Sign in to start matching
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
                onChangeText={setEmail}
                value={email}
              />

              {/* Password */}
              <View className="relative">
                <TextInput
                  className="h-12 rounded-xl px-3.5 pr-12 text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700"
                  placeholder="Password"
                  placeholderTextColor="#9ca3af"
                  secureTextEntry={!showPw}
                  returnKeyType="done"
                  textContentType="password"
                  autoComplete="password"
                  value={password}
                  onChangeText={setPassword}
                />
                <Pressable
                  onPress={() => setShowPw((s) => !s)}
                  accessibilityRole="button"
                  accessibilityLabel={
                    showPw ? "Hide password" : "Show password"
                  }
                  hitSlop={10}
                  className="absolute right-2.5 top-2.5 w-7 h-7 rounded-full items-center justify-center"
                >
                  <MaterialIcons
                    name={showPw ? "visibility-off" : "visibility"}
                    size={22}
                    color={colors.iconMuted}
                  />
                </Pressable>
              </View>

              {/* Divider */}
              <View className="h-px bg-neutral-200 dark:bg-neutral-700" />

              {/* Sign In */}
              <Pressable
                onPress={handleSignIn}
                disabled={loading}
                accessibilityRole="button"
                accessibilityLabel="Sign in"
                className="bg-neutral-100 dark:bg-neutral-800 rounded-2xl py-3.5 items-center justify-center mt-0.5 active:opacity-70"
              >
                <Text className="text-base text-neutral-900 dark:text-white">
                  {loading ? "Signing in…" : "Sign In"}
                </Text>
              </Pressable>

              {/* Forgot Password */}
                <Pressable 
                  accessibilityRole="link" 
                  className="self-center"
                  onPress={() => router.push("/forgot")}>
                  <Text className="text-blue-500 dark:text-blue-400">
                    Forgot password?
                  </Text>
                </Pressable>

              {/* OR divider */}
              <View className="flex-row items-center my-1">
                <View className="flex-1 h-px bg-neutral-200 dark:bg-neutral-700" />
                <Text className="mx-2 text-neutral-500 dark:text-neutral-400">
                  or continue with
                </Text>
                <View className="flex-1 h-px bg-neutral-200 dark:bg-neutral-700" />
              </View>

              {/* Social sign-in */}
              <View className="flex-row justify-center gap-9 mt-1">
                <Pressable
                  // onPress
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
                  Don't have an account?{" "}
                    <Text
                      accessibilityRole="link"
                      accessibilityLabel="Create account"
                      className="text-blue-500 dark:text-blue-400"
                      onPress={() => router.replace("/create-account")}
                    >
                      Create one
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
