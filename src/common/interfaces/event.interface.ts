import { EventStatus } from '../enums/event-status.enum';

export interface Event {
  eventId: string;
  name: string;
  description: string;
  startTime: Date; // เวลาเก็บลง JSON จะกลายเป็น ISO String
  endTime: Date;
  location: string;
  capacity: number;
  currentBookings: number;
  status: EventStatus;
}