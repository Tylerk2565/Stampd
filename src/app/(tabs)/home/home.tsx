import {
  Platform,
  View,
  Text,
  Pressable,
  Image,
  Dimensions,
  ActivityIndicator,
  Animated,
  PanResponder,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useState, useEffect, useMemo, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { supabase } from "@/lib/supabase";
import { useColors } from "@/hooks/use-colors";
import { useColorScheme } from "nativewind";
import { UserProfile } from "@/types/database";

const SCREEN_WIDTH = Dimensions.get("window").width;

const calculateAge = (birthdate: string) => {
  const today = new Date();
  const birth = new Date(birthdate);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
};

export default function HomePage() {
  const colors = useColors();
  const router = useRouter();

  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = useRef(new Animated.ValueXY()).current;

  const profile = profiles[currentIndex];
  const nextProfile = profiles[currentIndex + 1];

  // Opacity values for LIKE / PASS overlays
  const likeOpacity = position.x.interpolate({
    inputRange: [0, 80],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });
  const passOpacity = position.x.interpolate({
    inputRange: [-80, 0],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (_, { dx, dy }) =>
          position.setValue({ x: dx, y: dy }),
        onPanResponderRelease: (_, { dx }) => {
          if (dx > 120) swipeRight();
          else if (dx < -120) swipeLeft();
          else
            Animated.spring(position, {
              toValue: { x: 0, y: 0 },
              useNativeDriver: false,
            }).start();
        },
      }),
    [currentIndex],
  );

  const swipeLeft = () => {
    Animated.timing(position, {
      toValue: { x: -SCREEN_WIDTH * 1.5, y: 0 },
      duration: 280,
      useNativeDriver: false,
    }).start(() => {
      setCurrentIndex((p) => p + 1);
      position.setValue({ x: 0, y: 0 });
    });
  };

  const swipeRight = () => {
    Animated.timing(position, {
      toValue: { x: SCREEN_WIDTH * 1.5, y: 0 },
      duration: 280,
      useNativeDriver: false,
    }).start(() => {
      setCurrentIndex((p) => p + 1);
      position.setValue({ x: 0, y: 0 });
    });
  };

  const rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ["-8deg", "0deg", "8deg"],
    extrapolate: "clamp",
  });

  return (
    <SafeAreaView className="flex-1 bg-neutral-100 dark:bg-neutral-950">
      {/* ── Top bar ── */}
      <View className="flex-row items-center justify-between px-5 pt-2 pb-1">
        <Text
          className="text-2xl font-bold text-neutral-900 dark:text-white"
          style={{ letterSpacing: 1 }}
        >
          Stamp'd
        </Text>
        <View className="flex-row gap-3">
          <Pressable
            onPress={() => router.navigate("/(tabs)/home/preferences")}
            accessibilityRole="button"
            accessibilityLabel="Filters"
            hitSlop={10}
            className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-800 items-center justify-center"
          >
            <Ionicons name="options-outline" size={20} color={colors.icon} />
          </Pressable>
          <Pressable
            onPress={() => router.navigate("/(tabs)/home/settings")}
            accessibilityRole="button"
            accessibilityLabel="Settings"
            hitSlop={10}
            className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-800 items-center justify-center"
          >
            <MaterialIcons name="settings" size={20} color={colors.icon} />
          </Pressable>
        </View>
      </View>

      {/* ── Card stack ── */}
      <View className="flex-1 px-4 pt-2 pb-4" style={{ position: "relative" }}>
        {/* Background card (next profile peek) */}
        {nextProfile && (
          <View
            style={{
              position: "absolute",
              top: 18,
              left: 28,
              right: 28,
              bottom: 88,
              borderRadius: 24,
              overflow: "hidden",
              // backgroundColor: isDark ? "#262626" : "#e5e7eb",
            }}
          >
            {/* TODO: replace with nextProfile photo */}
            <Image
              source={require("../../../../assets/images/profile1.png")}
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "cover",
                opacity: 0.5,
              }}
            />
          </View>
        )}

        {/* Foreground swipe card */}
        <Animated.View
          {...panResponder.panHandlers}
          style={{
            position: "absolute",
            top: 8,
            left: 16,
            right: 16,
            bottom: 80,
            borderRadius: 24,
            overflow: "hidden",
            // backgroundColor: isDark ? "#171717" : "#ffffff",
            transform: [
              { translateX: position.x },
              { translateY: position.y },
              { rotate },
            ],
            ...Platform.select({
              ios: {
                shadowColor: "#000",
                // shadowOpacity: isDark ? 0.4 : 0.15,
                shadowRadius: 20,
                shadowOffset: { width: 0, height: 8 },
              },
              android: { elevation: 6 },
            }),
          }}
        >
          {/* Photo — full bleed */}
          {/* TODO: replace with profile.photos[0] when photo upload is implemented */}
          <Image
            source={require("../../../../assets/images/profile1.png")}
            style={{ width: "100%", height: "100%", resizeMode: "cover" }}
          />

          {/* LIKE stamp overlay */}
          <Animated.View
            style={{
              position: "absolute",
              top: 48,
              left: 24,
              opacity: likeOpacity,
              transform: [{ rotate: "-15deg" }],
            }}
            pointerEvents="none"
          >
            <View
              style={{
                borderWidth: 3,
                borderColor: "#34C759",
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 4,
              }}
            >
              <Text
                style={{
                  color: "#34C759",
                  fontSize: 28,
                  fontWeight: "800",
                  letterSpacing: 2,
                }}
              >
                STAMP
              </Text>
            </View>
          </Animated.View>

          {/* PASS stamp overlay */}
          <Animated.View
            style={{
              position: "absolute",
              top: 48,
              right: 24,
              opacity: passOpacity,
              transform: [{ rotate: "15deg" }],
            }}
            pointerEvents="none"
          >
            <View
              style={{
                borderWidth: 3,
                borderColor: "#FF453A",
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 4,
              }}
            >
              <Text
                style={{
                  color: "#FF453A",
                  fontSize: 28,
                  fontWeight: "800",
                  letterSpacing: 2,
                }}
              >
                PASS
              </Text>
            </View>
          </Animated.View>

          {/* Gradient info panel */}
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.55)", "rgba(0,0,0,0.92)"]}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              paddingHorizontal: 20,
              paddingTop: 60,
              paddingBottom: 24,
            }}
          >
            {/* Country tag */}
            {/* TODO: replace "Tokyo, Japan" with profile.country/city when available */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                marginBottom: 8,
              }}
            >
              <Text style={{ fontSize: 14 }}>📍</Text>
              <Text
                style={{
                  color: "rgba(255,255,255,0.75)",
                  fontSize: 13,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  fontWeight: "600",
                }}
              >
                Tokyo, Japan
              </Text>
            </View>

            {/* Name + age */}
            {/* <Text
              style={{
                color: "#ffffff",
                fontSize: 32,
                fontWeight: "700",
                letterSpacing: 0.5,
                lineHeight: 36,
              }}
            >
              {profile.full_name},{" "}
              <Text style={{ fontWeight: "400" }}>
                {calculateAge(profile.birthdate)}
              </Text>
            </Text> */}

            {/* Bio */}
            {/* {profile.bio && (
              <Text
                numberOfLines={2}
                style={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: 14,
                  marginTop: 8,
                  lineHeight: 20,
                }}
              >
                {profile.bio}
              </Text>
            )} */}

            {/* Tags row — TODO: wire up to profile interests */}
            <View
              style={{
                flexDirection: "row",
                gap: 8,
                marginTop: 12,
                flexWrap: "wrap",
              }}
            >
              {["Travel", "Languages", "Culture"].map((tag) => (
                <View
                  key={tag}
                  style={{
                    backgroundColor: "rgba(255,255,255,0.15)",
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: "rgba(255,255,255,0.25)",
                  }}
                >
                  <Text
                    style={{ color: "#fff", fontSize: 12, fontWeight: "500" }}
                  >
                    {tag}
                  </Text>
                </View>
              ))}
            </View>
          </LinearGradient>
        </Animated.View>

        {/* ── Action buttons ── */}
        <View
          style={{
            position: "absolute",
            bottom: 16,
            left: 0,
            right: 0,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 24,
          }}
        >
          {/* Pass */}
          <Pressable
            onPress={swipeLeft}
            accessibilityRole="button"
            accessibilityLabel="Pass"
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              // backgroundColor: isDark ? "#262626" : "#ffffff",
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1.5,
              borderColor: "#FF453A",
              ...Platform.select({
                ios: {
                  shadowColor: "#FF453A",
                  shadowOpacity: 0.2,
                  shadowRadius: 8,
                  shadowOffset: { width: 0, height: 4 },
                },
                android: { elevation: 3 },
              }),
            }}
          >
            <MaterialIcons name="close" size={28} color="#FF453A" />
          </Pressable>

          {/* Super like / info — TODO: implement super like */}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="View profile"
            onPress={() => router.navigate("/(tabs)/profile/profile")}
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              // backgroundColor: isDark ? "#262626" : "#f5f5f5",
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <Ionicons
              name="information-circle-outline"
              size={22}
              color={colors.iconMuted}
            />
          </Pressable>

          {/* Stamp / Like */}
          <Pressable
            onPress={swipeRight}
            accessibilityRole="button"
            accessibilityLabel="Stamp"
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              // backgroundColor: isDark ? "#262626" : "#ffffff",
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1.5,
              borderColor: "#34C759",
              ...Platform.select({
                ios: {
                  shadowColor: "#34C759",
                  shadowOpacity: 0.2,
                  shadowRadius: 8,
                  shadowOffset: { width: 0, height: 4 },
                },
                android: { elevation: 3 },
              }),
            }}
          >
            <MaterialIcons name="favorite" size={28} color="#34C759" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
