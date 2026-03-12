import React, { createContext, useState, useCallback } from "react";
import type { ReactNode } from "react";
import type { Event } from "../types";
import { formatDateKey } from "../utils/date";

type EventModalMode = "create" | "edit";

interface EventModalState {
  isOpen: boolean;
  mode: EventModalMode;
  initialData: Partial<Event>;
}

interface EventModalContextType {
  state: EventModalState;
  openCreateModal: (date: Date, startTime?: string) => void;
  openEditModal: (event: Event) => void;
  closeModal: () => void;
}

export const EventModalContext = createContext<EventModalContextType | undefined>(undefined);

const addOneHour = (time: string): string => {
  const [h, m] = time.split(":").map(Number);
  const endH = Math.min(h + 1, 23);
  return `${String(endH).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
};

export const EventModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<EventModalState>({
    isOpen: false,
    mode: "create",
    initialData: {},
  });

  const openCreateModal = useCallback((date: Date, startTime?: string) => {
    const dateStr = formatDateKey(date);
    const resolvedStart = startTime ?? "09:00";
    setState({
      isOpen: true,
      mode: "create",
      initialData: {
        date: dateStr,
        startTime: resolvedStart,
        endTime: addOneHour(resolvedStart),
      },
    });
  }, []);

  const openEditModal = useCallback((event: Event) => {
    setState({ isOpen: true, mode: "edit", initialData: event });
  }, []);

  const closeModal = useCallback(() => {
    setState({ isOpen: false, mode: "create", initialData: {} });
  }, []);

  return (
    <EventModalContext.Provider value={{ state, openCreateModal, openEditModal, closeModal }}>
      {children}
    </EventModalContext.Provider>
  );
};
