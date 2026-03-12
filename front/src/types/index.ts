export interface Event {
  _id: string;
  title: string;
  date: string;
  createdAt: string;
  startTime: string;
  endTime: string;
  description?: string;
}

export interface Holiday {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
}
