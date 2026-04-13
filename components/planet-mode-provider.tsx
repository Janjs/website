"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import type { PlanetMode } from "@/lib/planet-mode";

type PlanetModeContextValue = {
  planetMode: PlanetMode;
  setPlanetMode: (planetMode: PlanetMode) => void;
};

const PlanetModeContext = createContext<PlanetModeContextValue | null>(null);

export function PlanetModeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [planetMode, setPlanetMode] = useState<PlanetMode>("earth");

  return (
    <PlanetModeContext.Provider value={{ planetMode, setPlanetMode }}>
      {children}
    </PlanetModeContext.Provider>
  );
}

export function usePlanetMode() {
  const context = useContext(PlanetModeContext);

  if (!context) {
    throw new Error("usePlanetMode must be used within a PlanetModeProvider");
  }

  return context;
}
