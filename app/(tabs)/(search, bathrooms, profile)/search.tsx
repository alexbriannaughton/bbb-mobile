import { COLORS } from "@/constants/colors";
import { Stack } from "expo-router";
import { ScreenWrapper } from "../../../components";
import { SText } from "../../../components/SText";
import { useAuth } from "../../context/auth-supabase";

export default function SearchScreen() {
  const { user } = useAuth();
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Search",
        
        }}
      />
      <ScreenWrapper>
        <Stack.Screen />
        <SText>hey from search screen</SText>
      </ScreenWrapper>
    </>
  );
}
