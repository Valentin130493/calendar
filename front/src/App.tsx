import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CalendarViewProvider } from "./contexts/CalendarContext";
import { EventModalProvider } from "./contexts/EventModalContext";
import Calendar from "./components/Calendar";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CalendarViewProvider>
        <EventModalProvider>
          <Calendar />
        </EventModalProvider>
      </CalendarViewProvider>
    </QueryClientProvider>
  );
};

export default App;
