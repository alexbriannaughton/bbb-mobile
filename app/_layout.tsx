import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ThemeProvider } from "@shopify/restyle";
//@ts-ignore
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";
import { PAPER_THEME } from "../constants/paperTheme";
import theme from "../constants/theme";
import { Provider, useAuth } from "./context/auth-supabase";

export { ErrorBoundary } from "expo-router";

import "expo-dev-client";


export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)/(search)/search",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider>
      <RootLayoutNav />
    </Provider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { authInitialized, user } = useAuth();

  if (!authInitialized && !user) return null;

  const client = new QueryClient();

  return (
    // <SafeAreaProvider>
    <ThemeProvider theme={theme}>
      <PaperProvider theme={PAPER_THEME}>
        <QueryClientProvider client={client}>
          <Stack screenOptions={{ headerShown: false }} />
        </QueryClientProvider>
      </PaperProvider>
    </ThemeProvider>
    // </SafeAreaProvider>
  );
}
