import { cn } from "@/lib/utils";
import ManageIcon from "@/assets/manage-icon.png";

export default function MainSidebar() {
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
            className="w-1/2 h-1/2 object-center transition-transform hover:scale-110 cursor-pointer"
          />
          <span className="font-bold text-center transition-transform hover:scale-110 cursor-pointer">
            附加包管理
          </span>
        </div>
      </div>
      {/* 侧边栏内容 */}
      <div className="h-5/6 w-full bg-gray-400 dark:bg-gray-300 bg-opacity-10 dark:bg-opacity-10 rounded-sm"></div>
    </div>
  );
}
