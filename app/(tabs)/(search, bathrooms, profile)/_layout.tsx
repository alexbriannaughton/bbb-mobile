import { COLORS } from "@/constants/colors";
import { Stack } from "expo-router";

export default function DynamicLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.BLACK,
        },
        headerTitleStyle: {
          fontFamily: "SpaceMono",
          color: COLORS.WHITE
        }
      }}
    />
  );
}
