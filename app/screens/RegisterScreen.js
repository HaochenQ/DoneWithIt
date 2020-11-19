import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import {
  AppForm,
  AppFormField,
  SubmitButton,
  ErrorMessage,
} from "../components/forms";
import registerApi from "../api/register";
import useAuth from "../auth/useAuth";
import authApi from "../api/auth";
import useApi from "../hooks/useApi";
import ActivityIndicator from "../components/ActivityIndicator";
import logger from "../utility/logger";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

export default function RegisterScreen() {
  const { logIn } = useAuth();
  const [registerFailed, setRegisterFailed] = useState(false);
  const [error, setError] = useState();
  const registerAPI = useApi(registerApi.register);
  const loginAPI = useApi(authApi.login);

  const handleSubmit = async (userInfo) => {
    const result = await registerAPI.request(userInfo);
    if (!result.ok) {
      setRegisterFailed(true);
      if (result.data) setError(result.data.error);
      else {
        setError("An unexpected error occured.");
        logger.log(result);
      }
      return;
    }

    setRegisterFailed(true);
    const { data: authToken } = await loginAPI.request(
      userInfo.email,
      userInfo.password
    );
    logIn(authToken);
  };
  return (
    <>
      <ActivityIndicator visible={registerAPI.loading || loginAPI.loading} />
      <Screen style={styles.container}>
        <AppForm
          initialValues={{ name: "", email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage error={error} visible={registerFailed} />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="account"
            name="name"
            placeholder="Name"
            textContenType="userName"
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            name="email"
            placeholder="Email"
            textContenType="emailAddress"
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="Password"
            secureTextEntry
            textContenType="password"
          />
          <SubmitButton title="Sign Up" />
        </AppForm>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
});
