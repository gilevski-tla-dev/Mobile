import { darkTheme, lightTheme } from "@/entities/Theme";
import { useColorScheme } from "@/shared/lib/useColorTheme";
import { useEffect, useState } from "react";

export const useToggleTheme = () => {
  const colorScheme = useColorScheme();

  const [theme, setTheme] = useState(
    colorScheme === "dark" ? darkTheme : lightTheme
  );

  useEffect(() => {
    setTheme(colorScheme === "dark" ? darkTheme : lightTheme);
  }, [colorScheme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === lightTheme ? darkTheme : lightTheme;
      return newTheme;
    });
  };

  return { theme, toggleTheme };
};
