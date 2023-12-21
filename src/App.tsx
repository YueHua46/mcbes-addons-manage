import "./App.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { DialogProvider } from "@/providers/DialogProvider";
import { RouterProvider } from "react-router-dom";
import { router } from "./route";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <DialogProvider>
        <RouterProvider router={router} />
      </DialogProvider>
    </ThemeProvider>
  );
}

export default App;
