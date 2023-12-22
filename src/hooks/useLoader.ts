import { useContext } from "react";
import { LoaderProviderContext } from "@/providers/LoaderProvider";

export default function useLoader() {
  const loader = useContext(LoaderProviderContext);
  if (!loader) throw new Error("useLoader 必须在 LoaderProvider 内使用");
  return loader;
}
