import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ActivityIndicator,
} from "react-native";
import { useSignup } from "../hooks/useSignup"; // Импортируем хук для регистрации

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: signup, isPending, isError, error } = useSignup(); // Используем isPending вместо isLoading

  const handleSignup = () => {
    signup({ email, login, password }); // Вызываем мутацию для регистрации
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      {/* Поле для ввода email */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Поле для ввода логина */}
      <TextInput
        style={styles.input}
        placeholder="Login"
        value={login}
        onChangeText={setLogin}
        autoCapitalize="none"
      />

      {/* Поле для ввода пароля */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Отображение ошибки */}
      {isError && (
        <Text style={styles.errorText}>
          {error?.message || "Signup failed"}
        </Text>
      )}

      {/* Кнопка для регистрации */}
      <Button title="Sign Up" onPress={handleSignup} disabled={isPending} />

      {/* Индикатор загрузки */}
      {isPending && <ActivityIndicator size="small" color="#0000ff" />}
    </View>
  );
};

export default SignupForm;

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
