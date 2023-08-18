import { Stack, useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";

import { CustomButton } from "../../components/CustomButton";
import { CustomInput } from "../../components/CustomInput";
import { SText } from "../../components/SText";
import { Spacer } from "../../components/Spacer";
import { SView } from "../../components/SView";
import { useAuth } from "../context/auth-supabase";

export default function ForgotPassword() {
  const { sendPasswordResetEmail } = useAuth();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (formData: any) => {
    const { email } = formData;
    const { data, error } = await sendPasswordResetEmail(email, () =>
      router.replace("/sign-in")
    );
  };

  return (
    <>
        <Stack.Screen
          options={{ title: "forgot password", headerShown: false }}
        />
        <SView style={{ flex: 1, justifyContent: "center" }}>          <SText textAlign="center" variant="header">
            Restore Password
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
          <CustomButton onPress={handleSubmit(onSubmit)}>
            Send Reset Instructions
          </CustomButton>
          <View style={{ marginTop: 32 }}>
            <SText
              variant="body"
              textAlign="left"
              onPress={() => router.push("/sign-in")}
            >
              Back to Login
            </SText>
          </View>
        </SView>
    </>
  );
}
