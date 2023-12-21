import { cn } from "@/lib/utils";
import Item, { type ItemProps } from "./Item";

export default function List({
  list,
  className,
}: {
  list: ItemProps[];
  className?: string;
}) {
  return (
    <div className={cn(["flex flex-col gap-2", className])}>
      {list.map((item, idx) => (
        <Item key={idx} {...item} />
      ))}
    </div>
  );
}
