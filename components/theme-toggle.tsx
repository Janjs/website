"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon-sm"
      onClick={() => {
        const isDark = document.documentElement.classList.contains("dark");
        setTheme(isDark ? "light" : "dark");
      }}
      aria-label="Toggle dark mode"
    >
      <Sun className="hidden size-4 dark:block" />
      <Moon className="size-4 dark:hidden" />
    </Button>
  );
}
