import { ReservationStatus } from '../enums/reservation-status.enum';

export interface Reservation {
  reservationId: string;
  userId: string;
  eventId: string;
  reservationDate: Date;
  status: ReservationStatus;
}