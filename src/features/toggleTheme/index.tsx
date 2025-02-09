import React from "react";
import { Button } from "react-native";
import { useToggleTheme } from "./model";

export const ToggleTheme = () => {
  const { theme, toggleTheme } = useToggleTheme();

  console.log(theme, toggleTheme);

  return <Button title="Переключить тему" onPress={toggleTheme} />;
};

// TODO Почему то не работает при нажатии (Исправить)
