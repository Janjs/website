"use client";

import { cn } from "@/lib/utils";

type ButtonGroupProps = React.ComponentProps<"div"> & {
  orientation?: "horizontal" | "vertical";
};

function ButtonGroup({
  className,
  orientation = "horizontal",
  ...props
}: ButtonGroupProps) {
  return (
    <div
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(
        "inline-flex",
        orientation === "vertical" ? "flex-col" : "flex-row",
        className
      )}
      {...props}
    />
  );
}

export { ButtonGroup };
