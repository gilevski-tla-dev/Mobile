import Tabs from "./navigation/Tabs";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./providers/ThemeProvider";

const queryClient = new QueryClient();

export default function AppContainer() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <NavigationContainer>
          <Tabs />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
