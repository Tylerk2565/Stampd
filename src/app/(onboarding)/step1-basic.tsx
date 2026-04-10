import {
  KeyboardAvoidingView,
  View,
  Text,
  TextInput,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { supabase } from "@/lib/supabase";
import { useColors } from "@/hooks/use-colors";

const GENDER_OPTIONS = ["Female", "Male"] as const;
type Gender = (typeof GENDER_OPTIONS)[number];

export default function Step1Page() {
  const router = useRouter();
  const colors = useColors();

  const [fullName, setFullName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState<Gender | "">("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        Alert.alert("Not signed in", "Please sign in again.");
        router.replace("/(auth)/sign-in");
      }
    })();
  }, []);

  const handleNext = async () => {
    if (!fullName.trim())
      return Alert.alert("Name required", "Please enter your name.");
    if (!birthdate.trim())
      return Alert.alert("Invalid birthday", "Use format MM/DD/YYYY.");

    try {
      setSaving(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("No current user");

      const { error } = await supabase.from("users").upsert({
        id: user.id,
        full_name: fullName.trim(),
        birthdate,
        gender: gender.toLowerCase(),
        consent: true,
      });
      if (error) throw error;

      router.push("/(onboarding)/step2-photos");
    } catch (e: any) {
      Alert.alert("Could not save profile", e.message ?? String(e));
    } finally {
      setSaving(false);
    }
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
                Setup Account
              </Text>
              <Text className="text-base text-neutral-500 dark:text-neutral-400 text-center">
                Let's start setting up your account
              </Text>
            </View>

            {/* Card */}
            <View className="bg-white dark:bg-neutral-900 p-5 mt-6 rounded-2xl gap-3.5 shadow-sm">
              {/* Name */}
              <TextInput
                className="h-12 rounded-xl px-3.5 text-base text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700"
                placeholder="Enter your name"
                placeholderTextColor="#9ca3af"
                autoCapitalize="words"
                autoCorrect={false}
                textContentType="name"
                autoComplete="name"
                value={fullName}
                onChangeText={setFullName}
              />

              {/* Birthday */}
              <TextInput
                className="h-12 rounded-xl px-3.5 text-base text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700"
                placeholder="MM/DD/YYYY"
                placeholderTextColor="#9ca3af"
                keyboardType="numbers-and-punctuation"
                accessibilityLabel="Birthday"
                value={birthdate}
                onChangeText={setBirthdate}
              />

              {/* Gender */}
              <View className="flex-row gap-2">
                {GENDER_OPTIONS.map((option) => {
                  const selected = gender === option;
                  return (
                    <Pressable
                      key={option}
                      onPress={() => setGender(option)}
                      accessibilityRole="radio"
                      accessibilityState={{ selected }}
                      accessibilityLabel={option}
                      className={`flex-1 py-3 rounded-xl items-center border ${
                        selected
                          ? "bg-blue-500 border-blue-500"
                          : "bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700"
                      }`}
                    >
                      <Text
                        className={`text-sm font-medium ${
                          selected
                            ? "text-white"
                            : "text-neutral-900 dark:text-white"
                        }`}
                      >
                        {option}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>

              {/* Next */}
              <Pressable
                onPress={handleNext}
                disabled={saving}
                accessibilityRole="button"
                accessibilityLabel="Next"
                className="bg-neutral-100 dark:bg-neutral-800 rounded-2xl py-3.5 items-center justify-center active:opacity-70"
              >
                <Text className="text-base font-semibold text-neutral-900 dark:text-white">
                  {saving ? "Saving…" : "Next"}
                </Text>
              </Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
