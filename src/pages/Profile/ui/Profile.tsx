import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { StatusBar } from "expo-status-bar";

export const Profile = () => {
  const logoutMutation = useLogout();
  const [avatar, setAvatar] = useState(null);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Извините, нам нужно разрешение на доступ к вашей галерее!");
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={pickImage} style={styles.avatar}>
          {avatar ? (
            <Image source={{ uri: avatar }} style={styles.avatarImage} />
          ) : (
            <View style={styles.avatarPlaceholder} />
          )}
        </TouchableOpacity>
        <Text>Никита</Text>
      </View>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Выйти</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F3F2F2",
  },
  header: {
    width: "100%",
    height: 150,
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: "row",
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#000",
    marginLeft: 16,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  avatarPlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ccc",
  },
});
