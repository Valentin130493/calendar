import React from "react";
import { type Event } from "../../types";
import { useDroppable } from "@dnd-kit/core";
import {
  AddEventButton,
  DateInfo,
  DayViewContainer,
  HolidayBadge,
  TimelineContent,
  TimelineHeader,
} from "./ViewStyles";
import { TIME_SLOTS } from "../../constants/time";
import EventItem from "../DayCell/EventItem";
import { formatDate } from "../../formatters";

const HOUR_HEIGHT = 64;
const SLOT_HEIGHT = HOUR_HEIGHT / 2;
const TOTAL_HEIGHT = 24 * HOUR_HEIGHT;
const LABEL_WIDTH = 56;
const EVENT_GAP = 2;

const HOURS = Array.from({ length: 24 }, (_, i) => i);

const formatHour = (hour: number): string => {
  if (hour === 0) return "12 AM";
  if (hour === 12) return "12 PM";
  return hour < 12 ? `${hour} AM` : `${hour - 12} PM`;
};

const timeToMinutes = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

type EventLayout = {
  event: Event;
  topPx: number;
  heightPx: number;
  column: number;
  totalColumns: number;
};

const collisionEnd = (event: Event) => {
  const s = timeToMinutes(event.startTime);
  const e = timeToMinutes(event.endTime);
  return Math.max(e, s + 1);
};

const computeLayout = (events: Event[]): EventLayout[] => {
  const timedEvents = events.filter((e) => e.startTime && e.endTime);

  const sorted = [...timedEvents].sort((a, b) => {
    const diff = timeToMinutes(a.startTime) - timeToMinutes(b.startTime);
    return diff !== 0 ? diff : timeToMinutes(b.endTime) - timeToMinutes(a.endTime);
  });

  const colEnds: number[] = [];
  const layouts: EventLayout[] = sorted.map((event) => {
    const startMin = timeToMinutes(event.startTime);
    const endMin = timeToMinutes(event.endTime);
    const cEnd = collisionEnd(event);

    const topPx = (startMin / 60) * HOUR_HEIGHT;
    const heightPx = Math.max(((endMin - startMin) / 60) * HOUR_HEIGHT, 24);

    let col = 0;
    while (col < colEnds.length && colEnds[col] > startMin) col++;
    colEnds[col] = cEnd;

    return { event, topPx, heightPx, column: col, totalColumns: 1 };
  });

  let changed = true;
  while (changed) {
    changed = false;
    for (let i = 0; i < layouts.length; i++) {
      const ev = layouts[i];
      const evStart = timeToMinutes(ev.event.startTime);
      const evEnd = collisionEnd(ev.event);
      for (let j = i + 1; j < layouts.length; j++) {
        const other = layouts[j];
        const oStart = timeToMinutes(other.event.startTime);
        const oEnd = collisionEnd(other.event);
        if (evStart < oEnd && evEnd > oStart) {
          const maxTotal = Math.max(
            ev.column + 1,
            other.column + 1,
            ev.totalColumns,
            other.totalColumns,
          );
          if (ev.totalColumns !== maxTotal || other.totalColumns !== maxTotal) {
            ev.totalColumns = maxTotal;
            other.totalColumns = maxTotal;
            changed = true;
          }
        }
      }
    }
  }

  return layouts;
};

interface DroppableSlotProps {
  slot: string;
  top: number;
  onClick?: (slot: string) => void;
}

const DroppableSlot: React.FC<DroppableSlotProps> = ({ slot, top, onClick }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `time-${slot.replace(":", "-")}`,
  });
  return (
    <div
      ref={setNodeRef}
      style={{
        position: "absolute",
        top,
        left: 0,
        right: 0,
        height: SLOT_HEIGHT,
        background: isOver ? "rgba(25, 118, 210, 0.07)" : "transparent",
        cursor: "pointer",
        zIndex: 0,
      }}
      onClick={() => onClick?.(slot)}
    />
  );
};

interface DayViewProps {
  selectedDate: Date;
  events: Event[];
  formatDateKey: (date: Date) => string;
  holidayName?: string;
  onTimeSlotClick?: (slot: string) => void;
  onAddEvent?: () => void;
}

const DayView: React.FC<DayViewProps> = ({
  selectedDate,
  events,
  formatDateKey,
  holidayName,
  onTimeSlotClick,
  onAddEvent,
}) => {
  const selectedDateKey = formatDateKey(selectedDate);
  const dayEvents = events.filter((e) => e.date === selectedDateKey);
  const layouts = computeLayout(dayEvents);

  return (
    <DayViewContainer>
      <TimelineHeader>
        <DateInfo>{formatDate(selectedDate)}</DateInfo>
        {holidayName && <HolidayBadge>{holidayName}</HolidayBadge>}
        <AddEventButton onClick={onAddEvent}>+ Add Event</AddEventButton>
      </TimelineHeader>

      <TimelineContent>
        <div style={{ display: "flex", height: `${TOTAL_HEIGHT}px` }}>
          <div
            style={{
              width: LABEL_WIDTH,
              flexShrink: 0,
              position: "relative",
              userSelect: "none",
            }}
          >
            {HOURS.map((hour) => (
              <div
                key={hour}
                style={{
                  position: "absolute",
                  top: hour * HOUR_HEIGHT - 9,
                  right: 8,
                  fontSize: "0.68rem",
                  color: "#999",
                  fontWeight: 500,
                  lineHeight: 1,
                  textAlign: "right",
                  visibility: hour === 0 ? "hidden" : "visible",
                }}
              >
                {formatHour(hour)}
              </div>
            ))}
          </div>

          <div
            style={{
              flex: 1,
              position: "relative",
              borderLeft: "1px solid #e0e0e0",
            }}
          >
            {HOURS.map((hour) => (
              <div
                key={`h-${hour}`}
                style={{
                  position: "absolute",
                  top: hour * HOUR_HEIGHT,
                  left: 0,
                  right: 0,
                  borderTop: hour === 0 ? "none" : "1px solid #e8e8e8",
                  pointerEvents: "none",
                  zIndex: 0,
                }}
              />
            ))}

            {HOURS.map((hour) => (
              <div
                key={`hh-${hour}`}
                style={{
                  position: "absolute",
                  top: hour * HOUR_HEIGHT + SLOT_HEIGHT,
                  left: 0,
                  right: 0,
                  borderTop: "1px dashed #f0f0f0",
                  pointerEvents: "none",
                  zIndex: 0,
                }}
              />
            ))}

            {TIME_SLOTS.map((slot, i) => (
              <DroppableSlot
                key={slot}
                slot={slot}
                top={i * SLOT_HEIGHT}
                onClick={onTimeSlotClick}
              />
            ))}

            {layouts.map(({ event, topPx, heightPx, column, totalColumns }) => (
              <div
                key={event._id}
                style={{
                  position: "absolute",
                  top: topPx,
                  height: heightPx,
                  left: `calc(${(column / totalColumns) * 100}% + ${EVENT_GAP}px)`,
                  width: `calc(${(1 / totalColumns) * 100}% - ${EVENT_GAP * 2}px)`,
                  zIndex: 1,
                  boxSizing: "border-box",
                }}
              >
                <EventItem event={event} inDayView style={{ height: "100%" }} />
              </div>
            ))}
          </div>
        </div>
      </TimelineContent>
    </DayViewContainer>
  );
};

export default DayView;
