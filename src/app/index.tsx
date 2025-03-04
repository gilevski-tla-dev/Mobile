import Tabs from "./navigation/Tabs";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./providers/ThemeProvider";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { AppInitializer } from "./providers/AppInitializer";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"; // Импортируем SafeArea
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";

const queryClient = new QueryClient();

export default function AppContainer() {
  useEffect(() => {
    // Устанавливаем цвет фона панели навигации
    NavigationBar.setBackgroundColorAsync("#343434");
  }, []);
  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#343434" />
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <NavigationContainer>
              <AppInitializer>
                <SafeAreaView style={{ flex: 1 }}>
                  <Tabs />
                </SafeAreaView>
              </AppInitializer>
            </NavigationContainer>
          </ThemeProvider>
        </QueryClientProvider>
      </Provider>
    </SafeAreaProvider>
  );
}
