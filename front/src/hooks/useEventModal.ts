import { useContext } from "react";
import { EventModalContext } from "../contexts/EventModalContext";

export const useEventModal = () => {
  const context = useContext(EventModalContext);
  if (!context) {
    throw new Error("useEventModal must be used within EventModalProvider");
  }
  return context;
};
