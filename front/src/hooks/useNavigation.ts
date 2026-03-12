import { useState } from "react";

const today = new Date();

export function useNavigation() {
  const [calendarDate, setCalendarDate] = useState(() => ({
    full: today,
    year: today.getFullYear(),
    month: today.getMonth(),
    day: today.getDate(),
  }));

  const prevMonth = () => {
    let newYear = calendarDate.year;
    let newMonth = calendarDate.month - 1;
    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    }
    const newFull = new Date(newYear, newMonth, 1);
    setCalendarDate({ full: newFull, year: newYear, month: newMonth, day: 1 });
  };

  const nextMonth = () => {
    let newYear = calendarDate.year;
    let newMonth = calendarDate.month + 1;
    if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }
    const newFull = new Date(newYear, newMonth, 1);
    setCalendarDate({ full: newFull, year: newYear, month: newMonth, day: 1 });
  };

  const prevDay = () => {
    const newFull = new Date(calendarDate.full);
    newFull.setDate(newFull.getDate() - 1);
    setCalendarDate({
      full: newFull,
      year: newFull.getFullYear(),
      month: newFull.getMonth(),
      day: newFull.getDate(),
    });
  };

  const nextDay = () => {
    const newFull = new Date(calendarDate.full);
    newFull.setDate(newFull.getDate() + 1);
    setCalendarDate({
      full: newFull,
      year: newFull.getFullYear(),
      month: newFull.getMonth(),
      day: newFull.getDate(),
    });
  };

  return { prevMonth, nextMonth, prevDay, nextDay, calendarDate, setCalendarDate };
}
