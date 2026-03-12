import React from "react";
import { type Event } from "../../types";
import DayCell from "../DayCell";
import { Cell, Grid, HeaderGrid } from "./ViewStyles";
import { WEEK_DAYS } from "../../constants/calendar";
import { useCalendarContext } from "../../hooks/useCalendar";

interface MonthViewProps {
  grid: Array<{ date: Date; isCurrentMonth: boolean }>;
  events: Event[];
  selectedDate: Date;
  getEventsForDay: (date: Date) => Event[];
  getHolidayForDay: (date: Date) => string | null;
  handleDayClick: (date: Date) => void;
  formatDateKey: (date: Date) => string;
}

const MonthView: React.FC<MonthViewProps> = ({
  grid,
  events,
  selectedDate,
  getEventsForDay,
  getHolidayForDay,
  handleDayClick,
  formatDateKey,
}) => {
  const { search } = useCalendarContext();
  const anyMatch =
    search.length > 0 &&
    events.some((e) => e.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <HeaderGrid>
        {WEEK_DAYS.map((d) => (
          <Cell key={d} isCurrent={true}>
            <strong>{d}</strong>
          </Cell>
        ))}
      </HeaderGrid>

      {search.length > 0 && !anyMatch && (
        <div style={{ padding: "8px", color: "#999" }}>No events found</div>
      )}

      <Grid>
        {grid.map((day) => {
          const dayKey = formatDateKey(day.date);
          const eventsForDay = getEventsForDay(day.date);
          const isSelected = formatDateKey(day.date) === formatDateKey(selectedDate);

          return (
            <DayCell
              key={dayKey}
              date={day.date}
              isCurrentMonth={day.isCurrentMonth}
              events={eventsForDay}
              holidayName={getHolidayForDay(day.date) ?? undefined}
              onDateClick={handleDayClick}
              isSelected={isSelected}
            />
          );
        })}
      </Grid>
    </>
  );
};

export default MonthView;
