import { Video, ResizeMode } from "expo-av";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function WelcomePage() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-black">
      <Video
        source={require("../../../assets/videos/video2.mp4")}
        shouldPlay={true}
        isMuted={true}
        isLooping={true}
        resizeMode={ResizeMode.COVER}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        pointerEvents="none"
      />

      {/* Overlay */}
      <View className="absolute inset-0 bg-black/35" />

      <SafeAreaView className="flex-1 justify-start" pointerEvents="box-none">
        <StatusBar style="light"/>
          {/* Hero */}
          <View className="pt-[100px] px-5 items-center gap-2">
            <Text className="text-5xl text-white tracking-[0.5px] font-[SourGummy_700Bold]">
              Stamp&apos;d
            </Text>
            <Text className="text-base text-white font-[SourGummy_400Regular]">
              Connections that travel
            </Text>
          </View>

          {/* Bottom card */}
          <View className="flex-1 justify-end">
            <View className="p-[22px] pt-6 gap-[14px]">
                <Pressable 
                  className="bg-white/15 rounded-[14px] py-[14px] items-center justify-center mt-1"
                  onPress={() => router.push("/create-account")}>
                  <Text className="text-white text-base">Create Account</Text>
                </Pressable>
                <Pressable 
                  className="bg-white/15 rounded-[14px] py-[14px] items-center justify-center mt-1"
                  onPress={() => router.push("/sign-in")}>
                  <Text className="text-white text-base">Sign In</Text>
                </Pressable>
            </View>
          </View>
      </SafeAreaView>
    </View>
  );
}
