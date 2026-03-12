import { useContext } from "react";
import { CalendarContext } from "../contexts/CalendarContext";

export const useCalendarContext = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error(
      "useCalendarContext must be used within CalendarContextProvider",
    );
  }
  return context;
};
