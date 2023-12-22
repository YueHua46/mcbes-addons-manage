import { app, BrowserWindow, ipcMain, dialog } from "electron";
import path from "node:path";
import Store from "electron-store";
import fs from "fs-extra";

// 构建的目录结构
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

let win: BrowserWindow | null;
// 🚧 使用 ['ENV_NAME'] 避免 vite:define 插件 - Vite@2.x
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

// 创建窗口的函数
function createWindow() {
  // 创建一个新的浏览器窗口
  win = new BrowserWindow({
    // 窗口图标
    icon: path.join(process.env.VITE_PUBLIC, "icon.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    frame: false,
  });

  // 测试主进程向渲染进程发送消息
  // 请注意，此消息将在渲染进程加载后发送
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  // 如果 VITE_DEV_SERVER_URL 存在，则加载此 URL
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // 否则，加载 'dist/index.html' 文件
    win.loadFile(path.join(process.env.DIST, "index.html"));
  }
}

// 当所有窗口都关闭时退出应用，除了 macOS。在 macOS 上，通常会保持应用及其菜单栏处于活动状态，直到用户使用 Cmd + Q 明确退出。
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

// activate 事件各种动作都可以触发此
//   *例如首次启动应用程序、尝试
//   *当应用程序已经运行时重新启动它，或者单击
//   *应用程序的停靠栏或任务栏图标。
app.on("activate", () => {
  // 当点击 dock 图标且没有其他窗口打开时，通常会在应用中重新创建一个窗口。
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// 当应用准备就绪后，创建窗口
app.whenReady().then(createWindow);

/** My Code */
const store = new Store();

// 监听窗口最小化事件
ipcMain.on("mini", () => {
  win?.minimize();
});

ipcMain.on("toggleWindowSize", () => {
  // 窗口是否最大化
  if (win?.isMaximized()) {
    // 恢复窗口大小
    win?.restore();
  } else {
    // 放大窗口
    win?.maximize();
  }
});
// 窗口关闭事件
ipcMain.on("close", () => {
  win?.close();
});

// 数据存储
ipcMain.on("store-get", async (event, val) => {
  event.returnValue = store.get(val);
});
ipcMain.on("store-set", async (event, key, val) => {
  store.set(key, val);
});

// 检查目标目录是否无误
ipcMain.on("checkingIsWhole", async (event) => {
  console.log("main checkingIsWhole start");
  const worldSaveLocation = store.get("worldSaveLocation") as string;
  const files = ["level.dat", "resource_packs", "behavior_packs", "db"];
  // 第一步校验世界存档路径是否存在
  console.log("worldSaveLocation", worldSaveLocation);
  if (!worldSaveLocation) {
    console.log("");
    event.returnValue = {
      isWhole: false,
      msg: "世界存档路径不存在",
    };
    return;
  }
  fs.stat(worldSaveLocation, (err, stats) => {
    if (err) {
      event.returnValue = {
        isWhole: false,
        msg: "世界存档路径不存在",
      };
      return;
    }
    if (!stats.isDirectory()) {
      event.returnValue = {
        isWhole: false,
        msg: "世界存档不是一个文件夹",
      };
      return;
    }
    // 第二步校验世界存档路径下是否存在以下文件
    for (const file of files) {
      if (!fs.existsSync(path.join(worldSaveLocation, file))) {
        event.returnValue = {
          isWhole: false,
          msg: "不存在文件: " + file + "请检查世界存档路径是否正确",
        };
        return;
      }
    }
    event.returnValue = {
      isWhole: true,
      msg: "检查通过",
    };
    return;
  });
  return false;
});

async function handleFileOpen(
  event: Electron.IpcMainInvokeEvent,
  options: Electron.OpenDialogOptions
) {
  console.log("handleFileOpen --> options", options);
  const { canceled, filePaths } = await dialog.showOpenDialog(options);

  if (!canceled) {
    return filePaths;
  }
}

ipcMain.handle("dialog:openFile", handleFileOpen);

ipcMain.handle("readDirectory", async (event, directory) => {
  try {
    // 读取目录中的文件
    const files = await fs.readdir(directory);
    return files;
  } catch (error: any) {
    throw new Error(`读取目录失败: ${error.message}`);
  }
});

ipcMain.handle("getFileInfo", async (event, filePath) => {
  try {
    // 获取文件信息
    const stats = await fs.stat(filePath);
    return stats;
  } catch (error: any) {
    throw new Error(`获取文件信息失败: ${error.message}`);
  }
});
