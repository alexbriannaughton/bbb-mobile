/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  NavigationContainer,
  createNavigationContainerRef,
} from "@react-navigation/native";

import { MainNavigator } from "./MainNavigator";

const navigationRef = createNavigationContainerRef();

export const Navigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <MainNavigator />
    </NavigationContainer>
  );
};
