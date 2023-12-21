import { useEffect, useState } from "react";
import useDialog from "@/hooks/useDialog";
import { useNavigate } from "react-router-dom";
import { cn } from "./lib/utils";
import Header from "./components/Header";
import Main from "./components/Main";

export default function RootLayout() {
  const [worldPath, setWorldPath] = useState("");
  const { open, close } = useDialog();
  const ng = useNavigate();

  useEffect(() => {
    setWorldPath(window.electron.store.get("world_path"));
    console.log("worldPath", worldPath);
    if (!worldPath) {
      console.log("open", open);
      open({
        title: "提示",
        content: "请先设置世界路径",
        actionText: "前往设置",
        confirm() {
          ng("/setting");
          close();
        },
        isCancel: true,
        cancelText: "取消",
        cancel() {
          ng("/error", {
            state: { errorMessage: "没有加载到世界路径，请先配置世界路径" },
          });
          close();
        },
      });
    }
  }, []);

  return (
    <div className={cn("h-full flex flex-col")}>
      <header className="drag">
        <div className="p-4">
          <Header />
        </div>
      </header>
      <main className="p-4 flex-1">
        <Main />
      </main>
    </div>
  );
}
