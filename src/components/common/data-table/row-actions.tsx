import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import DynamicLucideIcon from "@/components/common/dynamic-lucide-icon";
import { icons } from "lucide-react";

export type RowAction = {
  label: string;
  icon?: keyof typeof icons;
  onClick: () => void;
  variant?: "default" | "destructive";
};

export function RowActions({ actions }: { actions: RowAction[] }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <DynamicLucideIcon name="EllipsisVertical" size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {actions.map((action) => (
          <DropdownMenuItem
            key={action.label}
            onClick={action.onClick}
            className={
              action.variant === "destructive"
                ? "text-destructive focus:text-destructive"
                : ""
            }
          >
            {action.icon && (
              <DynamicLucideIcon
                name={action.icon}
                size={14}
                className="mr-2"
              />
            )}
            {action.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
