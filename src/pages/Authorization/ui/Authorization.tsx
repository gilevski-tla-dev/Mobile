import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import LoginForm from "@/features/auth/ui/LoginForm";

export const Authorization = ({ navigation }) => {
  return (
    <View>
      <Text>Authorization</Text>
      <LoginForm />
      <Button
        title="Go to Registration"
        onPress={() => navigation.navigate("Registration")}
      />
    </View>
  );
};

export default Authorization;

const styles = StyleSheet.create({});
