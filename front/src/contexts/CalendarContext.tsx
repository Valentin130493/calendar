import React, { createContext, useState, useCallback } from "react";
import type { ReactNode } from "react";

type CalendarViewMode = "month" | "day";

interface CalendarContextType {
  viewMode: CalendarViewMode;
  setViewMode: (mode: CalendarViewMode) => void;
  search: string;
  setSearch: (value: string) => void;
}

export const CalendarContext = createContext<
  CalendarContextType | undefined
>(undefined);

const STORAGE_KEY = "calendar-view-mode";

interface CalendarProviderProps {
  children: ReactNode;
  initialMode?: CalendarViewMode;
}

export const CalendarViewProvider: React.FC<CalendarProviderProps> = ({
  children,
  initialMode = "month",
}) => {
  const [viewMode, setViewModeState] = useState<CalendarViewMode>(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as CalendarViewMode | null;
    return stored ?? initialMode;
  });

  const [search, setSearch] = useState("");

  const setViewMode = useCallback((mode: CalendarViewMode) => {
    localStorage.setItem(STORAGE_KEY, mode);
    setViewModeState(mode);
  }, []);

  return (
    <CalendarContext.Provider value={{ viewMode, setViewMode, search, setSearch }}>
      {children}
    </CalendarContext.Provider>
  );
};
