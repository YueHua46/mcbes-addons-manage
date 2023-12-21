// Setting.tsx

import useDialog from "@/hooks/useDialog";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function Setting() {
  const [worldSaveLocation, setWorldSaveLocation] = useState<string>(
    window.electron.store.get("worldSaveLocation")
  );
  const [isEditing, setIsEditing] = useState(false);
  const dialog = useDialog();

  const handleSaveLocationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setWorldSaveLocation(event.target.value);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveLocationSave = () => {
    // 如果是编辑状态，保存世界存档位置到 Electron Store 或执行必要的操作
    if (isEditing) {
      window.electron.store.set("worldSaveLocation", worldSaveLocation);
      // 在这里添加检查目录是否存在且完整的逻辑
      const info = window.electron.checkingIsWhole();
      if (info.isWhole) {
        dialog.open({
          title: "校验成功",
          content: "已保存您的世界存档位置",
          actionText: "确定",
          confirm: () => {
            setIsEditing(false); // 保存成功后退出编辑状态
            dialog.close();
          },
          isCancel: false,
        });
      } else {
        dialog.open({
          title: "校验失败",
          content: info.msg,
          actionText: "确定",
          confirm: () => {
            dialog.close();
          },
          isCancel: false,
        });
      }
    } else {
      // 如果不是编辑状态，只切换到编辑状态
      setIsEditing(true);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">世界存档位置配置</h2>
      <div className="mb-4">
        <Label htmlFor="worldSaveLocation">世界存档位置</Label>
        <div className="flex items-center">
          <Input
            type="text"
            id="worldSaveLocation"
            name="worldSaveLocation"
            value={worldSaveLocation}
            onChange={handleSaveLocationChange}
            disabled={!isEditing}
            readOnly={!isEditing}
          />
          {isEditing && (
            <Button onClick={handleSaveLocationSave} className="ml-2">
              保存
            </Button>
          )}
        </div>
      </div>
      {!isEditing && (
        <Button
          onClick={handleEditClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          编辑
        </Button>
      )}
    </div>
  );
}
