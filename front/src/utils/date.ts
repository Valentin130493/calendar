export interface DayInfo {
  date: Date;
  isCurrentMonth: boolean;
}

export const formatDateKey = (date: Date) =>
  `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

export const generateMonthGrid = (year: number, month: number): DayInfo[] => {
  const firstOfMonth = new Date(year, month, 1);
  const lastOfMonth = new Date(year, month + 1, 0);

  const startDay = firstOfMonth.getDay();
  const totalDays = lastOfMonth.getDate();

  const grid: DayInfo[] = [];

  for (let i = 0; i < startDay; i++) {
    const d = new Date(year, month, i - startDay + 1);
    grid.push({ date: d, isCurrentMonth: false });
  }

  for (let i = 1; i <= totalDays; i++) {
    grid.push({ date: new Date(year, month, i), isCurrentMonth: true });
  }

  const remaining = 7 - (grid.length % 7);
  if (remaining < 7) {
    for (let i = 1; i <= remaining; i++) {
      const d = new Date(year, month + 1, i);
      grid.push({ date: d, isCurrentMonth: false });
    }
  }

  return grid;
};
