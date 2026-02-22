import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from '../../common/interfaces/event.interface';
import { JsonDB } from '../../common/utils/json-db.util';
import { randomUUID } from 'crypto';

@Injectable()
export class EventsService {
  private readonly db: JsonDB<Event>;

  constructor() {
    this.db = new JsonDB<Event>('events');
  }

  create(createEventDto: CreateEventDto): Event {
    const events = this.db.read();
    
    // Validate เช็คเวลาเริ่มต้องก่อนเวลาจบ (ป้องกัน Error 500 ตาม Requirement)
    if (new Date(createEventDto.startTime) >= new Date(createEventDto.endTime)) {
      throw new BadRequestException('เวลาเริ่มต้นต้องอยู่ก่อนเวลาสิ้นสุด');
    }

    const newEvent: Event = {
      eventId: randomUUID(),
      name: createEventDto.name,
      description: createEventDto.description,
      startTime: new Date(createEventDto.startTime),
      endTime: new Date(createEventDto.endTime),
      location: createEventDto.location,
      capacity: createEventDto.capacity,
      currentBookings: 0,
      status: createEventDto.status,
    };

    events.push(newEvent);
    this.db.write(events);

    return newEvent;
  }

  findAll(): Event[] {
    return this.db.read();
  }

  findOne(id: string): Event {
    const events = this.db.read();
    const event = events.find(e => e.eventId === id);
    
    if (!event) {
      throw new NotFoundException(`ไม่พบกิจกรรมรหัส ${id}`);
    }
    
    return event;
  }

  update(id: string, updateEventDto: UpdateEventDto): Event {
    const events = this.db.read();
    const eventIndex = events.findIndex(e => e.eventId === id);

    if (eventIndex === -1) {
      throw new NotFoundException(`ไม่พบกิจกรรมรหัส ${id}`);
    }

    const updatedEvent: Event = {
      ...events[eventIndex],
      ...updateEventDto,
      startTime: updateEventDto.startTime ? new Date(updateEventDto.startTime) : events[eventIndex].startTime,
      endTime: updateEventDto.endTime ? new Date(updateEventDto.endTime) : events[eventIndex].endTime,
    };

    events[eventIndex] = updatedEvent;
    this.db.write(events);

    return updatedEvent;
  }

  remove(id: string): void {
    const events = this.db.read();
    const eventIndex = events.findIndex(e => e.eventId === id);

    if (eventIndex === -1) {
      throw new NotFoundException(`ไม่พบกิจกรรมรหัส ${id} ให้ลบ`);
    }

    events.splice(eventIndex, 1);
    this.db.write(events);
  }

  updateBookingCount(eventId: string, increment: number): void {
    const events = this.db.read();
    const eventIndex = events.findIndex(e => e.eventId === eventId);
    
    if (eventIndex > -1) {
      events[eventIndex].currentBookings += increment;
      this.db.write(events);
    }
  }
}