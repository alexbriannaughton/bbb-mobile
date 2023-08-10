import React, { useState } from "react";
import useUserLogin from "../api/auth/hooks/useUserLogin";
import { LoggedInNavigator } from "./LoggedInNavigator";
import { LoggedOutNavigator } from "./LoggedOutNavigator";

interface MainNavigatorProps {}

// https://reactnavigation.org/docs/stack-navigator

enum LoginStatus {
  loggedIn,
  loggedOut,
  unknown,
}

const MainNavigator = ({}: MainNavigatorProps) => {
  // https://reactnavigation.org/docs/auth-flow/
  const [loginStatus, setLoginStatus] = useState<LoginStatus>(
    LoginStatus.unknown
  );
  
  console.log(loginStatus);

  const onLoggedIn = () => {
    setLoginStatus(LoginStatus.loggedIn);
  };

  useUserLogin(onLoggedIn, () => {
    setLoginStatus(LoginStatus.loggedOut);
  });

  if (loginStatus === LoginStatus.unknown) {
    return null;
  }

  if (LoginStatus.loggedIn === loginStatus) {
    return <LoggedInNavigator />;
  }
  return <LoggedOutNavigator />;
};

export { MainNavigator };
