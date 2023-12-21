import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import List from "@/components/List";

export default function AddonsManage() {
  return (
    <div className={cn("p-4")}>
      <h2 className="text-2xl font-bold mb-4">附加包管理</h2>
      <Tabs defaultValue="resource">
        {/* tab list */}
        <TabsList className="grid w-full grid-cols-2 gap-2 bg-gray-200 dark:bg-[#191919]">
          <TabsTrigger value="resource" className={cn("font-bold")}>
            资源包
          </TabsTrigger>
          <TabsTrigger value="behavior" className={cn("font-bold")}>
            行为包
          </TabsTrigger>
        </TabsList>
        {/* tab content */}
        <TabsContent value="resource">
          <Card>
            <CardHeader>
              <CardTitle>资源包管理</CardTitle>
              <CardDescription>
                资源包（resource_pack）主要是我的世界基岩版中应用于世界的外观等的pack
                可以管理资源包的删除和添加以及优先级
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <List
                list={[
                  {
                    title: "资源包标题",
                    description: "资源包描述1234567890",
                  },
                  {
                    title: "资源包标题",
                    description: "资源包描述1234567890",
                  },
                  {
                    title: "资源包标题",
                    description: "资源包描述1234567890",
                  },
                  {
                    title: "资源包标题",
                    description: "资源包描述1234567890",
                  },
                  {
                    title: "资源包标题",
                    description: "资源包描述1234567890",
                  },
                  {
                    title: "资源包标题",
                    description: "资源包描述1234567890",
                  },
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="behavior">
          <Card>
            <CardHeader>
              <CardTitle>行为包管理</CardTitle>
              <CardDescription>
                行为包（behavior_pack）主要是添加或修改我的世界基岩版中实体或方块等的属性或相关事件的pack。
                在这里可以管理行为包的删除和添加以及优先级
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Current behavior</Label>
                <Input id="current" type="behavior" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New behavior</Label>
                <Input id="new" type="behavior" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save behavior</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
