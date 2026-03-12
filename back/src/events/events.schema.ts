import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EventDocument = CalendarEvent & Document;

@Schema()
export class CalendarEvent {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true, default: 0 })
  order: number;

  @Prop({ default: '00:00' })
  startTime: string;

  @Prop({ default: '01:00' })
  endTime: string;

  @Prop()
  description?: string;
}

export const EventSchema = SchemaFactory.createForClass(CalendarEvent);

export default CalendarEvent;
