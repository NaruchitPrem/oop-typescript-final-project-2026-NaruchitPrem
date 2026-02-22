import { ReservationStatus } from '../enums/reservation-status.enum';

export interface Reservation {
  reservationId: string;
  userId: string; // อ้างอิงถึง Participant.userId
  eventId: string; // อ้างอิงถึง Event.eventId
  reservationDate: Date;
  status: ReservationStatus;
}