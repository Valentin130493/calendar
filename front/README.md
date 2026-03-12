# Calendar — Frontend

React app with month and day views, drag-and-drop, and search.

## Stack

- React 19 + TypeScript
- Vite 7
- Emotion (styled components)
- dnd-kit (drag & drop)
- TanStack Query (cache and API sync)

## Local development

```bash
yarn install
yarn dev
```

App runs at `http://localhost:5173`.

## Production build

```bash
yarn build
```

Static files output to `dist/`.

## Environment variables

Create a `.env` file in `front/`:

```env
VITE_API_URL=http://localhost:3000
```

In production, set the URL of your deployed backend.

## Features

- **Month view** — grid with month navigation and holidays
- **Day view** — 24h timeline, cards proportional to duration, overlapping events shown side by side (like Google Calendar)
- Create, edit, and delete events
- Drag & drop between days and time slots
- Search by event title
