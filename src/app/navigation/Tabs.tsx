import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";
import { Profile } from "@/pages/Profile";
import { Home } from "@/pages/Home";
import { CameraPage } from "@/pages/CameraPage";
import { Authorization } from "@/pages/Authorization";
import { RootState } from "../redux/store";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <Tab.Navigator
      id={undefined}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#4CAF50",
          height: 60,
        },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#B0B0B0",
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "bold",
        },
      }}
    >
      {isAuthenticated ? (
        <>
          <Tab.Screen
            name="Home"
            component={Home}
            options={{ title: "Главная" }}
          />
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
        </>
      ) : (
        <Tab.Screen
          name="Authorization"
          component={Authorization}
          options={{ title: "Авторизация" }}
        />
      )}
    </Tab.Navigator>
  );
}
