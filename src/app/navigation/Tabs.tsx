import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
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
import { CustomHeader } from "@/shared/ui/CustomHeader"; // Импортируем CustomHeader

const Tab = createBottomTabNavigator();

// Tab Navigator для AuthStack (без TabBar)
function AuthTabs() {
  return (
    <Tab.Navigator
      id={undefined}
      tabBar={() => null} // Скрываем TabBar
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Authorization" component={Authorization} />
      <Tab.Screen name="Registration" component={Registration} />
    </Tab.Navigator>
  );
}

// Tab Navigator для основных экранов
function MainTabs() {
  return (
    <Tab.Navigator
      id={undefined}
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: true }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          tabBarLabel: "Главная",
          header: () => (
            <CustomHeader
              title="Главная"
              isSearch={true}
              onSearchPress={() => navigation.navigate("MyPlants")}
            />
          ),
        })}
      />

      <Tab.Screen
        name="Diagnostic"
        component={Diagnostic}
        options={{
          tabBarLabel: "Диагностика",
          header: () => <CustomHeader title="Диагностика" />,
        }}
      />
      <Tab.Screen
        name="Camera"
        component={CameraPage}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="MyPlants"
        component={MyPlants}
        options={{
          tabBarLabel: "Мои растения",
          header: () => <CustomHeader title="Мои растения" />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Профиль",
          header: () => <CustomHeader title="Профиль" />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  // Условный рендеринг: показываем либо AuthTabs, либо MainTabs
  return isAuthenticated ? <MainTabs /> : <AuthTabs />;
}
