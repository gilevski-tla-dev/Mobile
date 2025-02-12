import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ActivityIndicator,
} from "react-native";
import { useLogin } from "../hooks/useLogin";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: login, isPending, isError, error } = useLogin(); // Используем isPending вместо isLoading

  const handleLogin = () => {
    login({ username, password });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {isError && (
        <Text style={styles.errorText}>{error?.message || "Login failed"}</Text>
      )}

      <Button title="Login" onPress={handleLogin} disabled={isPending} />

      {isPending && <ActivityIndicator size="small" color="#0000ff" />}
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});
