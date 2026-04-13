"use client";

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
  const defaultQuote = "Currently based in Amsterdam, the Netherlands, working in AI consultancy.";
  const defaultItem =
    items.find((item) => item.id === "dutch-bank" || item.label.includes("Amsterdam")) ?? items[0];
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasSpotlight, setHasSpotlight] = useState(false);

  const activeItem = items[activeIndex] ?? items[0];
  const displayedItem = hasSpotlight ? activeItem : defaultItem;
  const activeItemId = hasSpotlight ? activeItem?.id : undefined;
  const displayedQuote = hasSpotlight ? activeItem.quote : defaultQuote;
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
    <div className="grid gap-6 md:items-stretch md:grid-cols-[minmax(0,1fr)_minmax(16rem,21rem)] md:gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,23rem)]">
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

      <div className="relative self-stretch">
        <div className="absolute -top-35 z-0 aspect-square w-full">
          <Globe className="z-0" location={displayedItem.location} label={displayedItem.label} />
        </div>

        <blockquote className="pointer-events-none absolute bottom-0 right-0 z-20 w-full max-w-[19rem] rounded-xl bg-card px-4 py-3 text-sm leading-relaxed text-card-foreground shadow-sm ring-1 ring-foreground/10">
          <p>
            <span aria-hidden="true">&ldquo;</span>
            {displayedQuote}
            <span aria-hidden="true">&rdquo;</span>
          </p>
        </blockquote>
      </div>
    </div>
  );
}
