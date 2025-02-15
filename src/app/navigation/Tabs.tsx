import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Registration } from "@/pages/Registration";
import { Profile } from "@/pages/Profile";
import { Home } from "@/pages/Home";
import { CameraPage } from "@/pages/CameraPage";
import { Authorization } from "@/pages/Authorization";
import { MyPlants } from "@/pages/MyPlants";
import { Diagnostic } from "@/pages/Diagnostic";
import { CustomTabBar } from "@/shared/ui/CustomTabBar";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <Tab.Navigator
      id={undefined}
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      {isAuthenticated ? (
        <>
          <Tab.Screen
            name="Home"
            component={Home}
            options={{ tabBarLabel: "Главная" }}
          />
          <Tab.Screen
            name="Diagnostic"
            component={Diagnostic}
            options={{ tabBarLabel: "Диагностика" }}
          />
          <Tab.Screen name="Camera" component={CameraPage} />
          <Tab.Screen
            name="MyPlants"
            component={MyPlants}
            options={{ tabBarLabel: "Мои растения" }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{ tabBarLabel: "Профиль" }}
          />
        </>
      ) : (
        <>
          <Tab.Screen
            name="Authorization"
            component={Authorization}
            options={{ tabBarStyle: { display: "none" } }}
          />
          <Tab.Screen
            name="Registration"
            component={Registration}
            options={{ tabBarStyle: { display: "none" } }}
          />
        </>
      )}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    height: 65,
    backgroundColor: "#343434",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 0,
  },
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  tabLabel: {
    fontSize: 9,
    fontWeight: "400",
    marginTop: 4,
  },
  // Стили для кнопки "Камера"
  cameraButton: {
    maxWidth: 60, // Увеличиваем размер кнопки
    height: 60, // Увеличиваем размер кнопки
    borderRadius: 30, // Половина ширины/высоты для круга
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#8B8B8B",
    top: "-50%",
  },
  // Стили для иконки "Камеры"
  cameraIcon: {
    width: 24, // Размер иконки
    height: 24, // Размер иконки
    tintColor: "#343434", // Цвет иконки
  },
});
