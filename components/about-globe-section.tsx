"use client";

import { MapPin } from "lucide-react";
import { useState } from "react";

import { Globe } from "@/components/ui/globe";
import { cn } from "@/lib/utils";

export type AboutGlobeItem = {
  id: string;
  quote: string;
  location: [number, number];
  label: string;
};

export type AboutGlobeEntryPart = {
  text: string;
  itemId?: string;
  className?: string;
};

export type AboutGlobeEntry = {
  id: string;
  parts: AboutGlobeEntryPart[];
};

export function AboutGlobeSection({
  items,
  entries,
}: {
  items: AboutGlobeItem[];
  entries: AboutGlobeEntry[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasSpotlight, setHasSpotlight] = useState(false);

  const activeItem = items[activeIndex] ?? items[0];
  const activeItemId = activeItem?.id;
  const itemIndexById = new Map(items.map((item, index) => [item.id, index]));

  const activate = (index: number) => {
    setActiveIndex(index);
    setHasSpotlight(true);
  };

  const reset = () => {
    setActiveIndex(0);
    setHasSpotlight(false);
  };

  return (
    <div className="grid items-start gap-6 md:grid-cols-[minmax(0,1fr)_minmax(16rem,21rem)] md:gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,23rem)]">
      <div
        className="space-y-4 sm:space-y-5"
        onMouseLeave={reset}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            reset();
          }
        }}
      >
        {entries.map((entry) => {
          const entryItemIds = entry.parts
            .map((part) => part.itemId)
            .filter((itemId): itemId is string => Boolean(itemId));
          const entryHasActiveItem = entryItemIds.includes(activeItemId ?? "");
          const entryUsesInternalSpotlight = entryItemIds.length > 1 && entryHasActiveItem;
          const entryIsDimmed = hasSpotlight && !entryHasActiveItem;

          return (
            <p
              key={entry.id}
              className={cn(
                "max-w-[38rem] text-[0.98rem] leading-[1.45] tracking-[-0.015em] text-foreground/92 transition duration-300 sm:text-[1.02rem]",
                entryIsDimmed && !entryUsesInternalSpotlight && "opacity-25 blur-[1.4px]"
              )}
            >
              {entry.parts.map((part, partIndex) => {
                const partIsActive = part.itemId === activeItemId;
                const partIsSoftened = entryUsesInternalSpotlight && !partIsActive;

                if (!part.itemId) {
                  return (
                    <span
                      key={`${entry.id}-${partIndex}`}
                      className={cn(
                        "transition duration-300",
                        partIsSoftened && "opacity-25 blur-[1.4px]"
                      )}
                    >
                      {part.text}
                    </span>
                  );
                }

                const itemIndex = itemIndexById.get(part.itemId);

                if (itemIndex === undefined) {
                  return (
                    <span
                      key={`${entry.id}-${partIndex}`}
                      className={cn(
                        "transition duration-300",
                        partIsSoftened && "opacity-25 blur-[1.4px]"
                      )}
                    >
                      {part.text}
                    </span>
                  );
                }

                const isActive = items[itemIndex]?.id === activeItemId;

                return (
                  <button
                    key={`${entry.id}-${part.itemId}-${partIndex}`}
                    type="button"
                    className={cn(
                      "inline cursor-pointer text-left text-foreground transition duration-300 hover:text-foreground focus-visible:rounded-[0.2rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      isActive && "text-foreground",
                      partIsSoftened && "opacity-25 blur-[1.4px]",
                      part.className
                    )}
                    onMouseEnter={() => activate(itemIndex)}
                    onFocus={() => activate(itemIndex)}
                    onClick={() => activate(itemIndex)}
                    aria-pressed={isActive}
                  >
                    {part.text}
                  </button>
                );
              })}
            </p>
          );
        })}
      </div>

      <div className="relative min-h-[19rem] sm:min-h-[21rem]">
        <div className="absolute inset-x-0 top-0 z-0 mx-auto aspect-square w-full max-w-[18rem] sm:max-w-[22rem]">
          <Globe className="z-0" location={activeItem.location} label={activeItem.label} />
        </div>

        <div className="pointer-events-none absolute left-[52%] top-[41%] z-20 flex -translate-y-1/2 items-center gap-2 rounded-full border border-white/60 bg-white/55 px-3 py-1.5 text-[0.82rem] text-foreground/70 shadow-[0_8px_30px_rgba(255,255,255,0.18)] backdrop-blur-xl sm:left-[56%] sm:text-sm dark:border-white/10 dark:bg-white/10 dark:text-foreground/78 dark:shadow-[0_10px_40px_rgba(0,0,0,0.18)]">
          <span className="inline-flex size-6 items-center justify-center rounded-full border border-foreground/15 bg-white/50 dark:bg-white/10">
            <MapPin className="size-3.5" strokeWidth={1.8} />
          </span>
          <span>{activeItem.label}</span>
        </div>

        <blockquote className="pointer-events-none absolute bottom-0 left-0 z-20 w-full max-w-[19rem] rounded-[1.55rem] border border-white/70 bg-white/58 px-4 py-3 text-sm leading-relaxed text-foreground shadow-[0_18px_48px_rgba(17,24,39,0.12)] backdrop-blur-xl sm:left-[3%] dark:border-white/12 dark:bg-white/10 dark:shadow-[0_18px_48px_rgba(0,0,0,0.28)]">
          <p>
            <span aria-hidden="true">&ldquo;</span>
            {activeItem.quote}
            <span aria-hidden="true">&rdquo;</span>
          </p>
        </blockquote>
      </div>
    </div>
  );
}
