import type { User } from "@supabase/supabase-js";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { EMAIL_AUTH } from "../supabase";

const useUserLogin = (
  onLoggedIn: (user: User) => void,
  onNotLoggedIn: () => void
) => {
  const navigation = useNavigation();

  useEffect(() => {
    const onEvent = (action: () => void) => {
      if (action) {
        action();
      }
    };

    EMAIL_AUTH.listenForLogin(
      (user: User) => {
        onLoggedIn(user);
      },
      () => onEvent(onNotLoggedIn)
    );
  }, [navigation, onLoggedIn, onNotLoggedIn]);
};

export default useUserLogin;
