import React from "react";

import type { Event } from "../../types";
import EventItem from "./EventItem";
import { useDroppable } from "@dnd-kit/core";
import { formatDateKey } from "../../utils/date";
import { useCalendarContext } from "../../hooks/useCalendar";
import { useEventModal } from "../../hooks/useEventModal";
import {
  Container,
  DayHeader,
  DayNumber,
  HolidayName,
  EventCount,
  EventsContainer,
} from "./DayCellStyles";
import { Button } from "../EventModal/EventModal.styles";
import { MdAdd } from "react-icons/md";

type DayCellProps = {
  date: Date;
  isCurrentMonth: boolean;
  events: Event[];
  holidayName?: string;
  onDateClick?: (date: Date) => void;
  isSelected?: boolean;
};

const DayCell: React.FC<DayCellProps> = ({
  date,
  isCurrentMonth,
  events,
  holidayName,
  onDateClick,
  isSelected = false,
}) => {
  const dayKey = formatDateKey(date);
  const { setNodeRef: setDroppableRef } = useDroppable({ id: dayKey });
  const { viewMode } = useCalendarContext();
  const { openCreateModal } = useEventModal();
  const isDayView = viewMode === "day";

  const handleContainerClick = () => {
    if (!isDayView) {
      onDateClick?.(date);
    }
  };

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openCreateModal(date);
  };

  return (
    <Container
      isCurrent={isCurrentMonth}
      ref={setDroppableRef}
      onClick={handleContainerClick}
      isSelected={isSelected}
      isDayView={isDayView}
    >
      <DayHeader>
        <DayNumber isCurrent={isCurrentMonth} isSelected={isSelected}>
          {date.getDate()}
        </DayNumber>
        {holidayName && (
          <HolidayName isSelected={isSelected}>{holidayName}</HolidayName>
        )}
        <Button
          onClick={handleAddClick}
          onPointerDown={(e) => e.stopPropagation()}
          title="Add Event"
          paddingLess={true}
        >
          <MdAdd size={10} />
        </Button>
      </DayHeader>

      {events.length > 0 && (
        <EventCount isSelected={isSelected}>
          {events.length} {events.length === 1 ? "event" : "events"}
        </EventCount>
      )}

      <EventsContainer>
        {events.map((event) => (
          <EventItem key={event._id} event={event} compact={true} />
        ))}
      </EventsContainer>
    </Container>
  );
};

export default DayCell;
