import React, { useMemo } from "react";

import { type Event } from "../types";
import MonthView from "./View/MonthView";
import DayView from "./View/DayView";
import { generateMonthGrid, formatDateKey } from "../utils/date";
import { useEvents } from "../hooks/useEvents";
import { useHolidays } from "../hooks/useHolidays";
import { useEventModal } from "../hooks/useEventModal";
import { useCalendarDragAndDrop } from "../hooks/useCalendarDragAndDrop";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import EventModal from "./EventModal/EventModal";
import EventItem from "./DayCell/EventItem";
import {
  CalendarContainer,
  FetchingBar,
  LoadingOverlay,
} from "./CalendarStyles";
import CalendarHeader from "./CalendarHeader";
import { useNavigation } from "../hooks/useNavigation";
import { formatDate } from "../formatters";
import { useCalendarContext } from "../hooks/useCalendar";

const Calendar: React.FC = () => {
  const {
    calendarDate,
    prevMonth,
    nextMonth,
    prevDay,
    nextDay,
    setCalendarDate,
  } = useNavigation();
  const { viewMode, setViewMode, search } = useCalendarContext();
  const { state: modalState, closeModal, openCreateModal } = useEventModal();

  const monthKey = `${calendarDate.year}-${String(calendarDate.month + 1).padStart(2, "0")}`;

  const { eventsQuery, addEvent, editEvent } = useEvents(monthKey);
  const holidaysQuery = useHolidays(calendarDate.year);

  const grid = generateMonthGrid(calendarDate.year, calendarDate.month);
  const events: Event[] = eventsQuery.data ?? [];

  const eventsByDate = useMemo(() => {
    const map: Record<string, Event[]> = {};
    events.forEach((e) => {
      if (!map[e.date]) map[e.date] = [];
      map[e.date].push(e);
    });
    Object.values(map).forEach((arr) =>
      arr.sort((a, b) => a.startTime.localeCompare(b.startTime)),
    );
    return map;
  }, [events]);

  const {
    sensors,
    collisionDetection,
    activeEvent,
    handleDragStart,
    handleDragEnd,
  } = useCalendarDragAndDrop({
    events,
    grid,
    viewMode,
    onEditEvent: (id, updates) => editEvent.mutate({ id, updates }),
  });

  const getEventsForDay = (date: Date) => {
    const key = formatDateKey(date);
    return (eventsByDate[key] || []).filter(
      (e) =>
        e.title.toLowerCase().includes(search.toLowerCase()) &&
        e._id !== activeEvent?._id,
    );
  };

  const handleSaveEvent = (data: Partial<Event>) => {
    if (modalState.mode === "edit" && modalState.initialData._id) {
      editEvent.mutate({ id: modalState.initialData._id, updates: data });
    } else {
      addEvent.mutate({ ...data });
      const [y, mo, d] = data.date!.split("-").map(Number);
      const newDate = new Date(y, mo - 1, d);
      setCalendarDate({
        full: newDate,
        year: newDate.getFullYear(),
        month: newDate.getMonth(),
        day: newDate.getDate(),
      });
    }
    closeModal();
  };

  const handleDayClick = (date: Date) => {
    setCalendarDate({
      full: date,
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate(),
    });
  };

  const handleTimeSlotClick = (slot: string) => {
    openCreateModal(new Date(calendarDate.full), slot);
  };

  const getHolidayForDay = (date: Date) => {
    if (!holidaysQuery.data) return null;
    const key = formatDateKey(date);
    return holidaysQuery.data.find((h) => h.date === key)?.localName || null;
  };

  const isLoading = eventsQuery.isLoading;
  const isRefetching = eventsQuery.isFetching && !eventsQuery.isLoading;
  const isMonthView = viewMode === "month";

  return (
    <CalendarContainer>
      <CalendarHeader
        isMounthView={isMonthView}
        onViewChange={() => setViewMode(isMonthView ? "day" : "month")}
        selectedDate={formatDate(calendarDate.full)}
        prev={isMonthView ? prevMonth : prevDay}
        next={isMonthView ? nextMonth : nextDay}
      />

      {isRefetching && <FetchingBar />}

      {isLoading ? (
        <LoadingOverlay>Loading events…</LoadingOverlay>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={collisionDetection}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          {isMonthView ? (
            <MonthView
              grid={grid}
              events={events}
              selectedDate={calendarDate.full}
              getEventsForDay={getEventsForDay}
              getHolidayForDay={getHolidayForDay}
              handleDayClick={handleDayClick}
              formatDateKey={formatDateKey}
            />
          ) : (
            <DayView
              selectedDate={calendarDate.full}
              events={events}
              formatDateKey={formatDateKey}
              holidayName={getHolidayForDay(calendarDate.full) ?? undefined}
              onTimeSlotClick={handleTimeSlotClick}
              onAddEvent={() => openCreateModal(new Date(calendarDate.full))}
            />
          )}

          <DragOverlay>
            {activeEvent ? (
              <EventItem event={activeEvent} isDragOverlay />
            ) : null}
          </DragOverlay>
        </DndContext>
      )}

      <EventModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        onSave={handleSaveEvent}
        initialData={modalState.initialData}
      />
    </CalendarContainer>
  );
};

export default Calendar;
