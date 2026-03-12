# Calendar — Backend

REST API для Calendar-приложения. NestJS + MongoDB (Mongoose) + TypeScript.

## Стек

- [NestJS](https://nestjs.com/) — Node.js framework
- [Mongoose](https://mongoosejs.com/) — MongoDB ODM
- TypeScript

## Структура

```
src/
├── app.module.ts
├── main.ts
└── events/
    ├── events.schema.ts
    ├── events.service.ts
    ├── events.controller.ts
    └── events.module.ts
```

## Переменные окружения

Создай `.env` в корне `back/`:

```env
MONGO_URI=mongodb://localhost:27017/calendar
PORT=3000
FRONT_END_URL=http://localhost:5173
```

## Запуск

```bash
npm install

# разработка
npm run start:dev

# продакшн
npm run build
npm run start:prod
```

## API

Base URL: `http://localhost:3000`

| Method   | Endpoint              | Описание                        |
|----------|-----------------------|---------------------------------|
| `GET`    | `/events`             | Все события                     |
| `GET`    | `/events?month=YYYY-MM` | События за конкретный месяц   |
| `POST`   | `/events`             | Создать событие                 |
| `PATCH`  | `/events/:id`         | Обновить событие                |
| `DELETE` | `/events/:id`         | Удалить событие                 |

## Схема события

```ts
{
  _id: string;
  title: string;       // обязательно
  date: string;        // обязательно, формат YYYY-MM-DD
  startTime: string;   // HH:MM, по умолчанию "00:00"
  endTime: string;     // HH:MM, по умолчанию "01:00"
  order: number;       // по умолчанию 0
  description?: string;
}
```
