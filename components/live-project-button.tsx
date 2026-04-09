"use client";

import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

type LiveProjectButtonProps = {
  href: string;
  className?: string;
};

export function LiveProjectButton({ href, className }: LiveProjectButtonProps) {
  return (
    <InteractiveHoverButton
      type="button"
      className={className}
      aria-label="Open live project"
      onClick={() => {
        window.open(href, "_blank", "noopener,noreferrer");
      }}
    >
      Live
    </InteractiveHoverButton>
  );
}
