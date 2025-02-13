import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SignupForm from "@/features/registration/ui/SignupForm";

export const Registration = () => {
  return (
    <View>
      <Text>Registration</Text>
      <SignupForm />
    </View>
  );
};

export default Registration;

const styles = StyleSheet.create({});
