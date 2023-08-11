import { Stack, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";

import {
  CustomButton,
  CustomInput,
  SText,
  SView,
  ScreenWrapper,
  Spacer,
} from "../../components";
import { useAuth } from "../context/auth-supabase";

export default function SignIn() {
  const { signIn } = useAuth();
  const router = useRouter();

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isSecureEntry, setIsSecureEntry] = useState(true);

  return (
    <ScreenWrapper>
      <Stack.Screen options={{ title: "sign up", headerShown: false }} />
      <SView style={{ flex: 1, justifyContent: "center" }}>
        <SText textAlign="center" variant="header">Welcome Back...</SText>
        <Spacer />
        {/* <SView>
          <Text>Email</Text>
          <TextInput
            placeholder="email"
            autoCapitalize="none"
            nativeID="email"
            onChangeText={(text) => {
              emailRef.current = text;
            }}
            style={styles.textInput}
          />
        </SView> */}
        <SView>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                label="email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
              />
            )}
            name="email"
          />
          {errors.email && <SText variant="body">This is required.</SText>}
        </SView>
        <Spacer size="hs" />
        <Controller
          control={control}
          rules={{
            maxLength: 100,
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              label="password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={isSecureEntry}
              right={
                <TextInput.Icon
                  icon={isSecureEntry ? "eye" : "eye-off"}
                  onPressIn={() => {
                    setIsSecureEntry(!isSecureEntry);
                  }}
                />
              }
            />
          )}
          name="password"
        />
        {/* <Spacer /> */}
        {/* 
        <SView>
          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="password"
            secureTextEntry={true}
            nativeID="password"
            onChangeText={(text) => {
              passwordRef.current = text;
            }}
            style={styles.textInput}
          />
        </SView> */}
        <Spacer />
        <CustomButton
          onPress={async () => {
            const { data, error } = await signIn(
              emailRef.current,
              passwordRef.current
            );
            if (data) {
              router.replace("/");
            } else {
              console.log(error);
              // Alert.alert("Login Error", resp.error?.message);
            }
          }}
        >
          Login
        </CustomButton>
        <View style={{ marginTop: 32 }}>
          <SText
          variant="body"
          textAlign="right"
            onPress={() => router.push("/sign-up")}
          >
           Create A New Account
          </SText>
        </View>
      </SView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 4,
    color: "#455fff",
  },
  textInput: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#455fff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    width: 250,
    borderRadius: 5,
    marginTop: 16,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});
