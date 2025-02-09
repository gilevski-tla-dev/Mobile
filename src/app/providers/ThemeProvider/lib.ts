import { lightTheme } from "@/entities/Theme";
import { createContext } from "react";

type ThemeContextType = {
  theme: typeof lightTheme;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  toggleTheme: () => {},
});
