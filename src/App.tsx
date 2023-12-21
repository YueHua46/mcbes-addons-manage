import "./App.css";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { DialogProvider } from "@/providers/DialogProvider";
import RootLayout from "@/RootLayout";
import Main from "./components/Main";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <DialogProvider>
        <RootLayout className="h-full flex flex-col">
          <header className="drag">
            <div className="p-4">
              <Header />
            </div>
          </header>
          <main className="p-4 flex-1">
            <Main />
          </main>
        </RootLayout>
      </DialogProvider>
    </ThemeProvider>
  );
}

export default App;
