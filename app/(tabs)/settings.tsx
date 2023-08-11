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
      <List.Item
        title="First Item"
        description="Item description"
        left={(props) => <List.Icon {...props} icon="folder" />}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
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
