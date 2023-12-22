import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import List from "@/components/List";
import { tableData } from "./data";
import { Button } from "../ui/button";
import useLoader from "@/hooks/useLoader";

export default function AddonsManage() {
  const { setLoading } = useLoader();
  async function handleAddAddon() {
    const filesPath = await window.dialog.openFile({
      title: "选择附加包",
      defaultPath: window.electron.store.get("worldSaveLocation"),
      // 过滤不是附加包类型的文件
      filters: [
        {
          name: "*",
          extensions: ["mcaddon", "mcpack", "zip"],
        },
      ],
      properties: ["openFile", "multiSelections", "createDirectory"],
    });
    console.log("filesPath", filesPath);
    // 加载附加包
    setLoading({
      hint: "正在加载附加包，请稍后...",
      loading: true,
    });

    window.dialog.readFile();
  }

  return (
    <div className={cn("p-4")}>
      <h2 className="text-2xl font-bold mb-4">附加包管理</h2>
      <Tabs defaultValue="resource">
        {/* tab list */}
        <TabsList className="grid w-full grid-cols-2 gap-2 bg-gray-200 dark:bg-[#191919]">
          {tableData.map((table) => {
            return (
              <TabsTrigger value={table.value} className={cn("font-bold")}>
                {table.value}管理
              </TabsTrigger>
            );
          })}
        </TabsList>
        {/* tab content */}
        {tableData.map((table) => {
          return (
            <TabsContent value={table.value}>
              <Card>
                <CardHeader className={cn("flex flex-col")}>
                  <CardTitle>{table.title}</CardTitle>
                  <CardDescription>{table.description}</CardDescription>
                  <Button
                    style={{ width: "100px" }}
                    className={cn("self-start")}
                    onClick={handleAddAddon}
                  >
                    添加附加包
                  </Button>
                </CardHeader>
                <CardContent className="space-y-2">
                  <List list={table.list} />
                </CardContent>
              </Card>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
