import { Outlet } from "react-router-dom";

export default function MainContent() {
  return (
    <div className="overflow-y-auto custom-scrollbar flex-1 w-5/6 bg-gray-400 dark:bg-gray-300 bg-opacity-10 dark:bg-opacity-10 rounded-sm">
      <Outlet />
    </div>
  );
}
