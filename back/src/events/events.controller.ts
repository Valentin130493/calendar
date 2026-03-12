import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { EventsService } from './events.service';

type EventBody = Partial<{
  title: string;
  date: string;
  order: number;
  startTime: string;
  endTime: string;
  description: string;
}>;

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  async find(@Query('month') month?: string) {
    if (month) return this.eventsService.findByMonth(month);
    return this.eventsService.findAll();
  }

  @Post()
  async create(@Body() body: EventBody) {
    return this.eventsService.create(body);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updates: EventBody) {
    return this.eventsService.update(id, updates);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }
}
