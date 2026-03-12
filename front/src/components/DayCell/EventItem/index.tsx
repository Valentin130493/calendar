import React from "react";
import { MdDelete } from "react-icons/md";
import type { Event } from "../../../types";
import { useEvents } from "../../../hooks/useEvents";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { useEventModal } from "../../../hooks/useEventModal";
import { Button, Container, TimeInfo, Title } from "./EventItemStyles";

type EventItemProps = {
  event: Event;
  style?: React.CSSProperties;
  compact?: boolean;
  isDragOverlay?: boolean;
  inDayView?: boolean;
};

const EventItem: React.FC<EventItemProps> = ({
  event,
  style,
  compact = false,
  isDragOverlay = false,
  inDayView = false,
}) => {
  const { removeEvent } = useEvents();
  const { openEditModal } = useEventModal();

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: event._id,
    data: { event },
    disabled: isDragOverlay,
  });

  const { setNodeRef: setDroppableRef } = useDroppable({
    id: `event-${event._id}`,
    disabled: isDragOverlay,
  });

  const combinedRef = React.useCallback(
    (node: HTMLElement | null) => {
      setNodeRef(node);
      setDroppableRef(node);
    },
    [setNodeRef, setDroppableRef],
  );

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    removeEvent.mutate(event._id);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDragging) return;
    openEditModal(event);
  };

  const draggingStyle: React.CSSProperties = isDragging ? { opacity: 0 } : {};

  return (
    <Container
      ref={isDragOverlay ? undefined : combinedRef}
      style={{ ...style, ...draggingStyle }}
      compact={compact}
      {...(isDragOverlay ? {} : { ...attributes, ...listeners })}
      inDayView={inDayView}
    >
      <Title onClick={handleClick} compact={compact}>
        <span>{event.title}</span>
        {!inDayView && event.startTime && event.endTime && (
          <TimeInfo>
            {event.startTime} – {event.endTime}
          </TimeInfo>
        )}
      </Title>

      <Button
        onClick={handleDelete}
        onPointerDown={(e) => e.stopPropagation()}
        title="Delete event"
      >
        <MdDelete size={18} />
      </Button>
    </Container>
  );
};

export default EventItem;
