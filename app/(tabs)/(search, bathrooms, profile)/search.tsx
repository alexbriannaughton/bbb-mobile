import { SView } from "../../../components/SView";
import { Stack } from "expo-router";
import React from "react";
import MapView from "react-native-maps";
import { ScreenWrapper } from "../../../components/ScreenWrapper";
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
        <SView flex={1}>
          <MapView
            style={{ width: "100%", height: "100%" }}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        </SView>
      </ScreenWrapper>
    </>
  );
}
