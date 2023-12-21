import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import McAddonIcon from "@/assets/mc-addon.png";

export interface ItemProps {
  title: string;
  description: string;
}

export default function Item({ title, description }: ItemProps) {
  return (
    <Alert>
      {/* icon */}
      <img src={McAddonIcon} className={cn("w-10 h-10")} />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
