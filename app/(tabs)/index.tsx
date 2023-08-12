import { StyleSheet, View } from "react-native";

import { SView, ScreenWrapper } from "../../components";
import { SText } from "../../components/SText";
import { PALETTE } from "../../constants/palette";
import EditScreenInfo from "../../components/EditScreenInfo";
import { useAuth } from "../context/auth-supabase";

export default function SearchScreen() {
  const { signOut, user } = useAuth();
  return (
    <ScreenWrapper>
        <SText>hey from index</SText>
        <SText onPress={() => signOut()}>Sign Out - {user?.email}</SText>
    </ScreenWrapper>
  );
}
