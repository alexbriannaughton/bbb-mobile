import { StyleSheet } from "react-native";
import { List } from "react-native-paper";
import { ScreenWrapper } from "../../components";
import { SText } from "../../components/SText";
import { useAuth } from "../context/auth-supabase";

export default function SettingsScreen() {
  const { user, signOut } = useAuth();
  return (
    <ScreenWrapper>
      <SText onPress={() => signOut()}>Sign Out - {user?.email}</SText>
      <SText>hey from settings</SText>
    </ScreenWrapper>
  );
}
