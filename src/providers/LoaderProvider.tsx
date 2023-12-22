import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { useMemo, useState } from "react";
import { createContext } from "react";

interface LoaderProviderProps {
  children: React.ReactNode;
  className?: ClassValue;
}

interface ILoaderProviderContextOptions {
  loading: boolean;
  hint?: string;
}
export interface ILoaderProviderContext {
  setLoading: (options: ILoaderProviderContextOptions) => void;
}

export const LoaderProviderContext = createContext<ILoaderProviderContext>({
  setLoading: () => {},
});

export default function LoaderProvider({
  children,
  className,
}: LoaderProviderProps) {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Loading...");

  const classList = useMemo(() => {
    return cn(
      "absolute top-0 left-0 -z-10 hidden w-screen h-screen transition-all backdrop-blur-sm",
      loading && "flex flex-col gap-2 z-10",
      className
    );
  }, [loading, className]);

  const value = {
    setLoading: ({
      hint = "Loading...",
      loading,
    }: ILoaderProviderContextOptions) => {
      console.log("set loader --- set loader", loading);

      setLoadingText(hint);
      setLoading((pre) => loading);
    },
  };

  return (
    <LoaderProviderContext.Provider value={value}>
      {children}
      <div className={classList}>
        <span className="loader absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></span>
        <h2 className="font-bold absolute top-[60%] left-[53%] -translate-x-1/2 -translate-y-1/2">
          {loadingText}
        </h2>
      </div>
    </LoaderProviderContext.Provider>
  );
}
