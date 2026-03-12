import { useState, useCallback } from "react";
import {
  type DragStartEvent,
  type DragEndEvent,
  type CollisionDetection,
  closestCenter,
  pointerWithin,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { Event } from "../types";
import { formatDateKey } from "../utils/date";

interface Props {
  events: Event[];
  grid: Array<{ date: Date }>;
  viewMode: "month" | "day";
  onEditEvent: (id: string, updates: Partial<Event>) => void;
}

interface Return {
  sensors: ReturnType<typeof useSensors>;
  collisionDetection: CollisionDetection;
  activeEvent: Event | null;
  handleDragStart: (event: DragStartEvent) => void;
  handleDragEnd: (event: DragEndEvent) => void;
}

export const useCalendarDragAndDrop = ({ events, grid, viewMode, onEditEvent }: Props): Return => {
  const [activeEvent, setActiveEvent] = useState<Event | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const collisionDetection = useCallback<CollisionDetection>(
    (args) => {
      if (viewMode === "day") {
        return pointerWithin({
          ...args,
          droppableContainers: args.droppableContainers.filter((c) =>
            String(c.id).startsWith("time-"),
          ),
        });
      }
      return closestCenter(args);
    },
    [viewMode],
  );

  const handleDragStart = useCallback(
    (e: DragStartEvent) => {
      const id = e.active.id as string;
      const data = e.active.data.current as { event: Event } | null;
      setActiveEvent(data?.event ?? events.find((ev) => ev._id === id) ?? null);
    },
    [events],
  );

  const handleDragEnd = useCallback(
    (e: DragEndEvent) => {
      setActiveEvent(null);
      const { active, over } = e;
      if (!over) return;

      const activeId = active.id as string;
      let overId = over.id as string;

      if (overId.startsWith("event-")) overId = overId.slice(6);

      const sourceEvent = events.find((ev) => ev._id === activeId);
      if (!sourceEvent) return;

      const timeSlotMatch = overId.match(/^time-(\d{2})-(\d{2})$/);
      if (timeSlotMatch) {
        const hour = parseInt(timeSlotMatch[1], 10);
        const minute = parseInt(timeSlotMatch[2], 10);
        const newStartTime = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;

        const [startH, startM] = sourceEvent.startTime.split(":").map(Number);
        const [endH, endM] = sourceEvent.endTime.split(":").map(Number);
        const durationMinutes = endH * 60 + endM - (startH * 60 + startM);

        const newEndMinutes = hour * 60 + minute + durationMinutes;
        const newEndHour = Math.floor(newEndMinutes / 60) % 24;
        const newEndMinute = newEndMinutes % 60;
        const newEndTime = `${String(newEndHour).padStart(2, "0")}:${String(newEndMinute).padStart(2, "0")}`;

        onEditEvent(activeId, { startTime: newStartTime, endTime: newEndTime });
        return;
      }

      const dateKeys = grid.map((day) => formatDateKey(day.date));
      const targetDate = dateKeys.includes(overId)
        ? overId
        : events.find((ev) => ev._id === overId)?.date;

      if (!targetDate || targetDate === sourceEvent.date) return;
      onEditEvent(activeId, { date: targetDate });
    },
    [events, grid, onEditEvent],
  );

  return { sensors, collisionDetection, activeEvent, handleDragStart, handleDragEnd };
};
