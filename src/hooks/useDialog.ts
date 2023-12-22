import { DialogProviderContext } from "@/providers/DialogProvider";
import { useContext } from "react";

export default function useDialog() {
  const context = useContext(DialogProviderContext);
  if (!context) throw new Error("useDialog 必须在 DialogProvider 内使用");

  return context;
}
