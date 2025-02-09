import React, { useContext } from "react";
import { ThemeContext } from "./lib";
import { useToggleTheme } from "@/features/toggleTheme/model";

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { theme, toggleTheme } = useToggleTheme();

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
