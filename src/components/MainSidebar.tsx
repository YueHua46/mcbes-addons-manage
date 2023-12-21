import { cn } from "@/lib/utils";
import ManageIcon from "@/assets/manage-icon.png";
import ManageSettingIcon from "@/assets/manage-setting.png";
import { useNavigate } from "react-router-dom";

export default function MainSidebar() {
  const ng = useNavigate();
  const worldSaveLocation = window.electron.store.get("worldSaveLocation");

  function toAddonsManage() {
    if (worldSaveLocation) {
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
    <div className="h-full w-30 flex flex-col gap-4">
      {/* sidebar */}
      {/* 一点透明背景色的侧边栏 */}
      {/* 侧边栏头部 */}
      <div className="h-30 bg-gray-400 dark:bg-gray-300 bg-opacity-10 dark:bg-opacity-10 rounded-sm">
        <div
          className={cn(
            "w-full h-full flex flex-col p-2 justify-center items-center"
          )}
        >
          <img
            src={ManageIcon}
            onClick={() => toAddonsManage()}
            className="w-10 h-10 object-center transition-transform hover:scale-110 cursor-pointer"
          />
          <span
            onClick={() => toAddonsManage()}
            className="font-bold text-center transition-transform hover:scale-110 cursor-pointer"
          >
            附加包管理
          </span>
        </div>
      </div>
      {/* 侧边栏内容 */}
      <div className="flex-1 w-full bg-gray-400 dark:bg-gray-300 bg-opacity-10 dark:bg-opacity-10 rounded-sm">
        <div className={cn("w-full h-full flex flex-col items-center p-2")}>
          <img
            src={ManageSettingIcon}
            onClick={() => ng("/setting")}
            className="w-10 h-10 object-center transition-transform hover:scale-110 cursor-pointer"
          />
          <span
            onClick={() => ng("/setting")}
            className="font-bold text-center transition-transform hover:scale-110 cursor-pointer"
          >
            设置
          </span>
        </div>
      </div>
    </div>
  );
}
