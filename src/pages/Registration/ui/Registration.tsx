import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import SignupForm from "@/features/registration/ui/SignupForm";

export const Registration = ({ navigation }) => {
  return (
    <View>
      <Text>Registration</Text>
      <SignupForm />
      <Button
        title="Go to Authorization"
        onPress={() => navigation.navigate("Authorization")}
      />
    </View>
  );
};

export default Registration;

const styles = StyleSheet.create({});
