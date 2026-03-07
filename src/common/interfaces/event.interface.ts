import { EventStatus } from '../enums/event-status.enum';

export interface Event {
  eventId: string;
  name: string;
  description: string;
  startTime: Date;
  endTime: Date;
  location: string;
  capacity: number;
  currentBookings: number;
  status: EventStatus;
  createdAt: Date;
  updatedAt: Date;
}