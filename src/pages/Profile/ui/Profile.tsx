import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useState } from "react";
import { useLogout } from "@/features/auth/hooks/useLogout";

export const Profile = () => {
  const [scale] = useState(new Animated.Value(1)); // Начальное значение масштаба
  const [isPressed, setIsPressed] = useState(false); // Состояние для отслеживания нажатия

  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate(); // Вызываем мутацию для выхода
  };

  const handlePress = () => {
    // Проверяем, было ли нажатие, и меняем масштаб
    Animated.spring(scale, {
      toValue: isPressed ? 1 : 1.5, // Если было нажатие, возвращаем к 1 (нормальный размер), если нет, увеличиваем
      useNativeDriver: true,
    }).start();

    setIsPressed(!isPressed); // Переключаем состояние нажатия
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Профиль</Text>

      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Animated.View
          style={[styles.buttonContainer, { transform: [{ scale }] }]}
        >
          <Text style={styles.buttonText}>
            {isPressed ? "Уменьшить" : "Увеличить"}
          </Text>
        </Animated.View>
      </TouchableOpacity>
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
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  tokenText: {
    marginBottom: 20,
    fontSize: 16,
    color: "#888",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonContainer: {
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  logoutButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#FF4C4C", // Красный цвет для кнопки "Выйти"
    borderRadius: 5,
  },
  logoutButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
