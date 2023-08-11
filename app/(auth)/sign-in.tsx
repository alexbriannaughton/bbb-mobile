import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, View } from "react-native";
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

  const onSubmit = async (formData: any) => {
    const { email, password } = formData;

    const { data, error } = await signIn(email, password);
    if (data) {
      router.replace("/");
    } else {
      console.log(error);
      Alert.alert("Login Error", error?.message);
    }
  };

  return (
    <ScreenWrapper>
      <Stack.Screen options={{ title: "sign up", headerShown: false }} />
      <SView style={{ flex: 1, justifyContent: "center" }}>
        <SText textAlign="center" variant="header">
          Welcome Back...
        </SText>
        <Spacer />
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
          {errors.email?.type === "required" && (
            <SText variant="error">This is required.</SText>
          )}
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
        {errors.password && <SText variant="error">This is required.</SText>}
        <Spacer size="hs" />
        <View>
          <SText
            variant="body"
            textAlign="right"
            onPress={() => router.push("/forgot-password")}
          >
            Forgot Password?
          </SText>
        </View>

        <Spacer />
        <CustomButton onPress={handleSubmit(onSubmit)}>Login</CustomButton>
        <View style={{ marginTop: 32 }}>
          <SText
            variant="body"
            textAlign="center"
            onPress={() => router.push("/sign-up")}
          >
            Create A New Account
          </SText>
        </View>
      </SView>
    </ScreenWrapper>
  );
}
