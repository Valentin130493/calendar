import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CalendarEvent, EventDocument } from './events.schema';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(CalendarEvent.name) private eventModel: Model<EventDocument>,
  ) {}

  async findAll(): Promise<CalendarEvent[]> {
    return this.eventModel.find().sort({ order: 1 }).exec();
  }

  async findByMonth(month: string): Promise<CalendarEvent[]> {
    const regex = new RegExp(`^${month}`);
    return this.eventModel
      .find({ date: { $regex: regex } })
      .sort({ order: 1 })
      .exec();
  }

  async create(payload: Partial<CalendarEvent>): Promise<CalendarEvent> {
    const created = new this.eventModel(payload);
    return created.save();
  }

  async update(
    id: string,
    updates: Partial<CalendarEvent>,
  ): Promise<CalendarEvent | null> {
    return this.eventModel.findByIdAndUpdate(id, updates, { new: true }).exec();
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    const res = await this.eventModel.findByIdAndDelete(id).exec();
    return { deleted: !!res };
  }
}
