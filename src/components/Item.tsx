import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import McAddonIcon from "@/assets/mc-addon.png";
import { Button } from "./ui/button";
import useDialog from "@/hooks/useDialog";

export interface ItemProps {
  title: string;
  description: string;
  lowestVersion: string;
}

export default function Item({ title, description, lowestVersion }: ItemProps) {
  const dialog = useDialog();
  // 删除附加包处理函数
  function handleDeleteAddon() {
    dialog.open({
      title: "删除附加包",
      content:
        "确定要删除该附加包吗？这会导致与其关联的相关附加包失效，请注意！",
      cancelText: "取消删除",
      actionText: "确定删除",
      isCancel: true,
      cancel: () => {
        dialog.close();
      },
      confirm: () => {
        // TODO: 在这里执行删除指定附加包的操作
        dialog.close();
      },
    });
  }
  return (
    <Alert className={cn("flex gap-4")}>
      {/* 资源包icon */}
      <img src={McAddonIcon} className={cn("w-10 h-10")} />
      <ul className={cn("flex gap-2 flex-1 justify-around")}>
        <li className={cn("flex flex-col")}>
          {/* 资源包name */}
          <AlertTitle className={cn("font-bold")}>资源包名</AlertTitle>
          <AlertDescription>{title}</AlertDescription>
        </li>
        <li className={cn("flex flex-col items-center")}>
          {/* 资源包描述 */}
          <AlertTitle
            className={cn("font-bold overflow-auto whitespace-normal")}
          >
            资源包描述
          </AlertTitle>
          <AlertDescription className={""}>{description}</AlertDescription>
        </li>
        <li className={cn("flex flex-col")}>
          {/* 资源包最低版本要求 */}
          <AlertTitle className={cn("font-bold")}>最低版本要求</AlertTitle>
          <AlertDescription>{lowestVersion}</AlertDescription>
        </li>
      </ul>
      <Button
        className={cn("bg-red-600 hover:bg-red-700")}
        onClick={handleDeleteAddon}
      >
        删除附加包
      </Button>
    </Alert>
  );
}
