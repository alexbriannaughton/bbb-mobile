import EditScreenInfo from "../../components/EditScreenInfo";
import { SText } from "../../components/SText";
import { StyleSheet, View } from "react-native";
import { useAuth } from "../context/auth-supabase";
import { ScreenWrapper } from "../../components";

export default function SearchScreen() {
  const { user } = useAuth();
  return (
    <ScreenWrapper>
      <SText>hey from search screen</SText>
    </ScreenWrapper>
  );
}
