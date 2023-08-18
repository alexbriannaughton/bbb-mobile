import { Stack } from "expo-router";
import { ScreenWrapper } from "../../../components";
import { SText } from "../../../components/SText";
import { useAuth } from "../../context/auth-supabase";

export default function SearchScreen() {
  const { signOut, user } = useAuth();
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Me",
        }}
      />
      <ScreenWrapper>
        <SText>hey from index</SText>
        <SText onPress={() => signOut()}>Sign Out - {user?.email}</SText>
      </ScreenWrapper>
    </>
  );
}
