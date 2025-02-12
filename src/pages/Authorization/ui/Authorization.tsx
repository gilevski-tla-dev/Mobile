import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LoginForm from "@/features/auth/ui/LoginForm";

export const Authorization = () => {
  return (
    <View>
      <Text>Authorization</Text>
      <LoginForm />
    </View>
  );
};

export default Authorization;

const styles = StyleSheet.create({});
