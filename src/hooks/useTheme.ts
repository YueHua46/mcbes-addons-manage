import { ThemeProviderContext } from "@/providers/ThemeProvider";
import { useContext, useEffect } from "react";

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  console.log("context", context);

  useEffect(() => {
    console.log("context", context);
  }, [context]);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
