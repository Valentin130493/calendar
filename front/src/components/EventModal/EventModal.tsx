import React, { useState, useEffect } from "react";

import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  Form,
  FormGroup,
  Label,
  Input,
  TextArea,
  TimeInputs,
  ButtonGroup,
  Button,
} from "./EventModal.styles";
import type { Event } from "../../types";

type EventModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Partial<Event>) => void;
  initialData?: Partial<Event>;
};

const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData = {},
}) => {
  const [form, setForm] = useState({
    title: "",
    date: "",
    startTime: "09:00",
    endTime: "10:00",
    description: "",
  });

  useEffect(() => {
    if (isOpen) {
      setForm({
        title: initialData.title || "",
        date: initialData.date || "",
        startTime: initialData.startTime || "09:00",
        endTime: initialData.endTime || "10:00",
        description: initialData.description || "",
      });
    }
  }, [isOpen, initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...form,
      title: form.title.trim(),
      description: form.description.trim() || undefined,
      _id: initialData._id,
    });
    onClose();
  };

  if (!isOpen) return null;

  const isEdit = !!initialData._id;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{isEdit ? "Edit Event" : "Create Event"}</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              name="title"
              type="text"
              value={form.title}
              onChange={handleChange}
              required
              autoFocus
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="date">Date *</Label>
            <Input
              id="date"
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <TimeInputs>
            <FormGroup>
              <Label htmlFor="startTime">Start Time *</Label>
              <Input
                id="startTime"
                name="startTime"
                type="time"
                value={form.startTime}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="endTime">End Time *</Label>
              <Input
                id="endTime"
                name="endTime"
                type="time"
                value={form.endTime}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </TimeInputs>

          <FormGroup>
            <Label htmlFor="description">Description</Label>
            <TextArea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Optional description..."
            />
          </FormGroup>

          <ButtonGroup>
            <Button type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {isEdit ? "Save Changes" : "Create Event"}
            </Button>
          </ButtonGroup>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default EventModal;
