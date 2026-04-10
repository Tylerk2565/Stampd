import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserProfile } from "@/types/database";

export default function ProfileTab() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
    const { data: UserProfle, error } = await supabase.from("profiles").select();
    setProfile(data);
  }

  return (
    <SafeAreaView>
      <Text>Profile</Text>
      {loading ? (
        <Text>Profile is Loading</Text> // TODO - Replace with loading icon
      ) : error ? (
        <Text>Error Loading Profile</Text>
      ): profile ? (
        <Text>Profile</Text>
      ): null}
    </SafeAreaView>
  );
}
