import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchEvents, createEvent, updateEvent, deleteEvent } from '../api/tasks';
import type { Event } from '../types';

export const useEvents = (month?: string) => {
	const queryClient = useQueryClient();

	const eventsQuery = useQuery({
		queryKey: ['events', month],
		queryFn: () => fetchEvents(month).then((res) => res.data).catch(() => [] as Event[]),
	});

	const addEvent = useMutation({
		mutationFn: (event: Partial<Event>) => createEvent(event).then((res) => res.data),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['events', month] }),
	});

	const editEvent = useMutation({
		mutationFn: ({ id, updates }: { id: string; updates: Partial<Event> }) =>
			updateEvent(id, updates).then((res) => res.data),

		onMutate: ({ id, updates }) => {
			void queryClient.cancelQueries({ queryKey: ['events', month] });
			const previous = queryClient.getQueryData<Event[]>(['events', month]);
			queryClient.setQueryData<Event[]>(['events', month], (old) =>
				old ? old.map((e) => (e._id === id ? { ...e, ...updates } : e)) : old,
			);
			return { previous };
		},
		onError: (_err, _vars, context: { previous?: Event[] } | undefined) => {
			if (context?.previous) {
				queryClient.setQueryData(['events', month], context.previous);
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['events', month] });
		},
	});

	const removeEvent = useMutation({
		mutationFn: (id: string) => deleteEvent(id).then(() => {}),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['events'], exact: false }),
	});

	return { eventsQuery, addEvent, editEvent, removeEvent };
};
