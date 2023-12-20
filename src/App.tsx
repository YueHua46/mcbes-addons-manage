import "./App.css";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { DialogProvider } from "@/providers/DialogProvider";
import RootLayout from "@/RootLayout";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <DialogProvider>
        <RootLayout>
          <header className="drag">
            <div className="w-full h-full p-4">
              <Header />
            </div>
          </header>
          <main>123</main>
        </RootLayout>
      </DialogProvider>
    </ThemeProvider>
  );
}

export default App;
