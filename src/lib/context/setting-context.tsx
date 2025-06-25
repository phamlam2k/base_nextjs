"use client";

import type { SettingsContextProps } from "@/types/setting.type";
import { createContext, useContext } from "react";
//

// ----------------------------------------------------------------------

export const SettingsContext = createContext({} as SettingsContextProps);

export const useSettingsContext = () => {
  const context = useContext(SettingsContext);

  if (!context)
    throw new Error("useSettingsContext must be use inside SettingsProvider");

  return context;
};
