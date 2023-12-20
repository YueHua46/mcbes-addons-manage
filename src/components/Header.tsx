import { cn } from "@/lib/utils";
import { XMarkIcon, MinusIcon } from "@heroicons/react/20/solid";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import logo from "@/assets/icon.png";

export default function Header({ className }: { className?: string }) {
  return (
    <div className={cn(`${className} flex justify-between`)}>
      {/* 左边logo */}
      <div className={cn("flex items-center")}>
        <img src={logo} className={cn("w-8 h-8 no-drag")} />
        <span className={cn("text-2xl font-bold ml-2 no-drag")}>
          BDS Addons Manage
        </span>
      </div>
      {/* 右边窗口管理 */}
      <div className={cn("flex gap-2 justify-end items-center")}>
        {/* 主题切换 */}
        <ModeToggle className={cn("no-drag")} />
        {/* 最小化 */}
        <Button
          variant={"ghost"}
          className={cn("no-drag rounded-full")}
          onClick={() => {
            window.ipcRenderer.send("mini");
          }}
        >
          <MinusIcon className={cn("w-6 h-6")} />
        </Button>

        {/* 最大化或恢复正常 */}
        <Button
          variant={"ghost"}
          className={cn("no-drag rounded-full")}
          onClick={() => window.ipcRenderer.send("toggleWindowSize")}
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M2 4.25A2.25 2.25 0 0 1 4.25 2h6.5A2.25 2.25 0 0 1 13 4.25V5.5H9.25A3.75 3.75 0 0 0 5.5 9.25V13H4.25A2.25 2.25 0 0 1 2 10.75v-6.5Z" />
              <path d="M9.25 7A2.25 2.25 0 0 0 7 9.25v6.5A2.25 2.25 0 0 0 9.25 18h6.5A2.25 2.25 0 0 0 18 15.75v-6.5A2.25 2.25 0 0 0 15.75 7h-6.5Z" />
            </svg>
          </div>
        </Button>

        {/* 关闭进程 */}
        <Button
          variant={"ghost"}
          className={cn("no-drag rounded-full")}
          onClick={() => window.ipcRenderer.send("close")}
        >
          <XMarkIcon className={cn("w-6 h-6")} />
        </Button>
      </div>
    </div>
  );
}
