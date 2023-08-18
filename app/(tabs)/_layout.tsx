import { COLORS } from "@/constants/colors";
import { scaleHeight, scaleWidth } from "@/constants/layout";
import { Entypo } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import React from "react";
import { useColorScheme } from "react-native";
import { PALETTE } from "../../constants/palette";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: PALETTE.bluePrimary,
        tabBarStyle: {
          backgroundColor: COLORS.BLACK,
   
        },
        tabBarLabelStyle: {
          fontFamily: "SpaceMono",
        },
       
      }}
    >
      <Tabs.Screen
        name="(search)"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Entypo
              name="magnifying-glass"
              size={scaleWidth(20)}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(bathrooms)"
        options={{
          title: "My Bathrooms",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="bath" size={scaleWidth(20)} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Entypo name="emoji-happy" size={scaleWidth(20)} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
