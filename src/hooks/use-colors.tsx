import { useColorScheme } from "nativewind";  

export function useColors() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return {
    icon:       isDark ? "#ffffff" : "#374151",
    iconMuted:  isDark ? "#9ca3af" : "6b7280",
    accent:     "#3b82f6",
    border:     isDark ? "#404040" : "#e5e7eb",
  };
}