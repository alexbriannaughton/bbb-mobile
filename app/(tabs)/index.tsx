import { StyleSheet, View } from "react-native";

import { ScreenWrapper } from "../../components";
import { SText } from "../../components/SText";
import { PALETTE } from "../../constants/palette";
import EditScreenInfo from "../../components/EditScreenInfo";
import { useAuth } from "../context/auth-supabase";

export default function TabOneScreen() {
  const { signOut, user } = useAuth();
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <SText style={styles.title}>Tab Ones</SText>
        <View style={styles.separator} />
        <EditScreenInfo path="app/(tabs)/index.tsx" />
        <SText onPress={() => signOut()}>Sign Out - {user?.email}</SText>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: PALETTE.blueSecondary,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
