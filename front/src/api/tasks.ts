import axios from 'axios';
import type { Event } from '../types';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
});

export const fetchEvents = (month?: string) =>
  client.get<Event[]>('/events', { params: month ? { month } : undefined });
export const createEvent = (event: Partial<Event>) => client.post<Event>('/events', event);
export const updateEvent = (id: string, updates: Partial<Event>) => client.patch<Event>(`/events/${id}`, updates);
export const deleteEvent = (id: string) => client.delete(`/events/${id}`);
