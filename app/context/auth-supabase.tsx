import { Session, User } from "@supabase/supabase-js";
import {
  router,
  useRootNavigationState,
  useRouter,
  useSegments,
} from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { supabase } from "../lib/supabase-service";

// Define the AuthContextValue interface
interface SignInResponse {
  data: User | undefined | null;
  error: Error | undefined;
}

interface SignOutResponse {
  error: any | undefined;
  data: {} | undefined;
}

interface ResetResponse {
  error: any | undefined;
  data: boolean | undefined;
}

interface AuthContextValue {
  signIn: (e: string, p: string) => Promise<SignInResponse>;
  signUp: (e: string, p: string, n: string) => Promise<SignInResponse>;
  signOut: () => Promise<SignOutResponse>;
  sendPasswordResetEmail: (
    e: string,
    cb?: VoidFunction
  ) => Promise<ResetResponse>;
  user: User | null | undefined;
  authInitialized: boolean;
  segments: any;
}

// Define the Provider component
interface ProviderProps {
  children: React.ReactNode;
}

// Create the AuthContext
const AuthContext = React.createContext<AuthContextValue | undefined>(
  undefined
);

export function Provider(props: ProviderProps) {
  const [user, setAuth] = React.useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [authInitialized, setAuthInitialized] = React.useState<boolean>(false);

  const segments = useSegments();

  // This hook will protect the route access based on user authentication.
  const useProtectedRoute = (user: User | null) => {
    const router = useRouter();

    // checking that navigation is all good;
    const navigationState = useRootNavigationState();

    useEffect(() => {
      if (!navigationState?.key || !authInitialized) return;
      const inAuthGroup = segments[0] === "(auth)";

      if (
        // If the user is not signed in and the initial segment is not anything in the auth group.
        !user &&
        !inAuthGroup
      ) {
        // Redirect to the sign-in page.
        router.replace("/sign-in");
      } else if (user && inAuthGroup) {
        // Redirect away from the sign-in page.
        router.replace("/(tabs)/(search)/search");
      }
    }, [user, segments, authInitialized, navigationState?.key]);
  };

  useEffect(() => {
    if (authInitialized) return;
    supabase.auth.onAuthStateChange((event, session) => {
      console.log("got user", session?.user?.email);
      setAuthInitialized(true);
      setAuth(session?.user || null);
      session?.user?.email && router.replace("/(tabs)/(search)/search");
    });
  }, []);

  /**
   *
   * @returns
   */
  const logout = async (): Promise<SignOutResponse> => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: undefined, data: true };
    } catch (error) {
      return { error, data: undefined };
    } finally {
      setAuth(null);
    }
  };
  /**
   *
   * @param email
   * @param password
   * @returns
   */
  const login = async (
    email: string,
    password: string
  ): Promise<SignInResponse> => {
    try {
      console.log(email, password);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      setAuth(data.user);
      setSession(data.session);
      return { data: user, error: undefined };
    } catch (error) {
      setAuth(null);
      setSession(null);
      return { error: error as Error, data: undefined };
    }
  };

  /**
   *
   * @param email
   * @param password
   * @param username
   * @returns
   */
  const createAcount = async (
    email: string,
    password: string,
    username: string
  ): Promise<SignInResponse> => {
    try {
      console.log(email, password, username);

      // create the user
      const signUpResp = await supabase.auth.signUp({ email, password });
      if (signUpResp.error) throw signUpResp.error;

      const updateResp = await supabase.auth.updateUser({
        data: { name: username },
      });
      if (updateResp.error) throw updateResp.error;
      updateResp.data.user;

      // set user
      setAuth(updateResp.data.user);

      // set session
      setSession(signUpResp.data.session);
      return { data: updateResp.data.user, error: undefined };
    } catch (error) {
      setAuth(null);
      setSession(null);
      return { error: error as Error, data: undefined };
    }
  };

  const sendPasswordResetEmail = async (
    email: string,
    onEmailSent: VoidFunction = () => {}
  ): Promise<ResetResponse> => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      Alert.alert(
        "Email Sent",
        `A password reset email has been sent to ${email}`,
        [
          {
            text: "Ok",
            onPress: () => {
              onEmailSent();
            },
          },
        ],
        { cancelable: false }
      );
      return { error: undefined, data: true };
    } catch (error) {
      return { error, data: undefined };
    }
  };

  useProtectedRoute(user);

  return (
    <AuthContext.Provider
      value={{
        signIn: login,
        signOut: logout,
        signUp: createAcount,
        sendPasswordResetEmail: sendPasswordResetEmail,
        user,
        authInitialized,
        segments: segments,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

// Define the useAuth hook
export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }

  return authContext;
};
