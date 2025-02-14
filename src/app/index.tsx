import Tabs from "./navigation/Tabs";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./providers/ThemeProvider";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { AppInitializer } from "./providers/AppInitializer";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"; // Импортируем SafeArea

const queryClient = new QueryClient();

export default function AppContainer() {
  return (
    <SafeAreaProvider>
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
