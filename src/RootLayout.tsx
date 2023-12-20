import React, { useEffect, useState } from "react";
import useDialog from "@/hooks/useDialog";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [worldPath, setWorldPath] = useState("");
  const { open, close } = useDialog();

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
          close();
        },
        isCancel: true,
        cancelText: "取消",
        cancel() {
          close();
        },
      });
    }
  }, []);

  return <div>{children}</div>;
}
