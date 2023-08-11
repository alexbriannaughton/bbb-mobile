import { Stack, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-paper";

import { SText, SView, ScreenWrapper} from "../../components";
import { CustomInput } from "../../components/CustomInput";
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
        {/* <Spacer size="hs" /> */}
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
        <TouchableOpacity
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
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <View style={{ marginTop: 32 }}>
          <Text
            style={{ fontWeight: "500" }}
            onPress={() => router.push("/sign-up")}
          >
            Click Here To Create A New Account
          </Text>
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
