import "./App.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { DialogProvider } from "@/providers/DialogProvider";
import { RouterProvider } from "react-router-dom";
import LoaderProvider from "@/providers/LoaderProvider";

import { router } from "./route";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <DialogProvider>
        <LoaderProvider>
          <RouterProvider router={router} />
        </LoaderProvider>
      </DialogProvider>
    </ThemeProvider>
  );
}

export default App;
