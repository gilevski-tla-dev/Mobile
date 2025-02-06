import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Profile } from "@/pages/Profile";
import { Home } from "@/pages/Home";
import { CameraPage } from "@/pages/CameraPage";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      id={undefined}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#4CAF50", // Цвет фона для tabBar
          height: 60, // Высота панели вкладок
        },
        tabBarActiveTintColor: "#fff", // Цвет активных иконок
        tabBarInactiveTintColor: "#B0B0B0", // Цвет неактивных иконок
        tabBarLabelStyle: {
          fontSize: 14, // Размер шрифта меток
          fontWeight: "bold", // Жирность шрифта меток
        },
      }}
    >
      <Tab.Screen name="Home" component={Home} options={{ title: "Главная" }} />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ title: "Профиль" }}
      />

      <Tab.Screen
        name="Camera"
        component={CameraPage}
        options={{ title: "Камера" }}
      />
    </Tab.Navigator>
  );
}
