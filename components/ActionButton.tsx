import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ActionButtonProps = {
  icon: ReactNode;
  label: ReactNode;
  circleClassName?: string;
  labelClassName?: string;
};

export function ActionButton({
  icon,
  label,
  circleClassName,
  labelClassName,
}: ActionButtonProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      className="h-auto w-20 flex-col gap-2 whitespace-normal px-1 py-1 text-center text-muted-foreground hover:bg-transparent hover:text-foreground"
    >
      <span
        className={cn(
          "flex size-11 items-center justify-center rounded-full",
          circleClassName
        )}
      >
        {icon}
      </span>
      <span
        className={cn(
          "flex items-center justify-center gap-0.5 text-sm",
          labelClassName
        )}
      >
        {label}
      </span>
    </Button>
  );
}
