import { StyleSheet, View } from "react-native";
import EditScreenInfo from "../../components/EditScreenInfo";
import { SText } from "../../components/SText";
import { useAuth } from "../context/auth-supabase";

export default function SettingsScreen() {
  const { user } = useAuth();
  return (
    <View style={styles.container}>
      <SText
        style={{
          marginTop: 32,
          marginBottom: 16,
          fontWeight: "bold",
          fontSize: 18,
        }}
      >
        User Information
      </SText>
      <SText style={styles.title}>Tab Two</SText>
      <View style={styles.separator} />
      <EditScreenInfo path="app/(tabs)/two.tsx" />

      <SText>{JSON.stringify(user, null, 2)}</SText>
    </View>
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
