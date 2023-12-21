import { cn } from "@/lib/utils";
import ManageIcon from "@/assets/manage-icon.png";
import { useNavigate } from "react-router-dom";

export default function MainSidebar() {
  const ng = useNavigate();
  const world_path = window.electron.store.get("world_path");

  function toAddonsManage() {
    if (world_path) {
      ng("/addonsManage");
    } else {
      ng("/error", {
        state: {
          errorMessage: "没有加载到世界路径，请先配置世界路径",
        },
      });
    }
  }

  return (
    <div className="h-full w-1/6 flex flex-col gap-4">
      {/* sidebar */}
      {/* 一点透明背景色的侧边栏 */}
      {/* 侧边栏头部 */}
      <div className="h-1/6 w-full bg-gray-400 dark:bg-gray-300 bg-opacity-10 dark:bg-opacity-10 rounded-sm">
        <div
          className={cn(
            "w-full h-full flex flex-col   justify-center items-center"
          )}
        >
          <img
            src={ManageIcon}
            onClick={() => toAddonsManage}
            className="w-1/2 h-1/2 object-center transition-transform hover:scale-110 cursor-pointer"
          />
          <span
            onClick={() => toAddonsManage}
            className="font-bold text-center transition-transform hover:scale-110 cursor-pointer"
          >
            附加包管理
          </span>
        </div>
      </div>
      {/* 侧边栏内容 */}
      <div className="h-5/6 w-full bg-gray-400 dark:bg-gray-300 bg-opacity-10 dark:bg-opacity-10 rounded-sm"></div>
    </div>
  );
}
