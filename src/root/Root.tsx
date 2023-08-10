import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import "react-native-url-polyfill/auto";
import "react-native-gesture-handler";


const Stack = createNativeStackNavigator();

const Root = () => {
  return <Navigation />;
};

export default Root;
