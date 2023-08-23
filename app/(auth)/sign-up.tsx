import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, View } from "react-native";
import { TextInput } from "react-native-paper";
import { CustomButton } from "../../components/CustomButton";
import { CustomInput } from "../../components/CustomInput";
import { SText } from "../../components/SText";
import { Spacer } from "../../components/Spacer";
import { SView } from "../../components/SView";
import { ScreenWrapper } from "../../components/ScreenWrapper";

import { useAuth } from "../context/auth-supabase";

export default function SignUp() {
  const { signUp } = useAuth();
  const router = useRouter();

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const userNameRef = useRef("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const [isSecureEntry, setIsSecureEntry] = useState(true);

  const onSubmit = async (formData: any) => {
    const { email, password, username } = formData;
    const { data, error } = await signUp(email, password, username);
    if (data) {
      router.replace("/(tabs)/(search)/search");
    } else {
      console.log(error);
      if (error?.message) {
        Alert.alert("Login Error", error?.message);
      }
    }
  };

  return (
    <ScreenWrapper backgroundColor="bgFive" paddingHorizontal="wm">
      <SView style={{ flex: 1, justifyContent: "center" }}>
        <SText textAlign="center" variant="header">
          Create Account
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
                label="username"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
              />
            )}
            name="username"
          />
          {errors.username?.type === "required" && (
            <SText variant="error">This is required.</SText>
          )}
        </SView>
        <Spacer size="hs" />
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

        <Spacer />
        <CustomButton onPress={handleSubmit(onSubmit)}>Sign Up</CustomButton>
        <View style={{ marginTop: 32 }}>
          <SText
            variant="body"
            textAlign="center"
            onPress={() => router.push("/sign-in")}
          >
            Return to Sign In
          </SText>
        </View>
      </SView>
    </ScreenWrapper>
  );
}
