import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Reservation } from '../../common/interfaces/reservation.interface';
import { ReservationStatus } from '../../common/enums/reservation-status.enum';
import { JsonDB } from '../../common/utils/json-db.util';
import { EventsService } from '../events/events.service';
import { ParticipantsService } from '../participants/participants.service';
import { randomUUID } from 'crypto';

@Injectable()
export class ReservationsService {
  private readonly db: JsonDB<Reservation>;

  constructor(
    private readonly eventsService: EventsService,
    private readonly participantsService: ParticipantsService,
  ) {
    this.db = new JsonDB<Reservation>('reservations');
  }

  create(createDto: CreateReservationDto): Reservation {
    // 1. เช็คว่ามี User นี้จริงไหม (ถ้าไม่มี service จะโยน 404 ออกมาเอง)
    this.participantsService.findOne(createDto.userId);

    // 2. เช็คว่ามี Event นี้จริงไหม
    const event = this.eventsService.findOne(createDto.eventId);

    // 3. เช็คที่นั่งว่าเต็มหรือยัง (Logic ป้องกัน 500 Error ตาม Requirement)
    if (event.currentBookings >= event.capacity) {
      throw new BadRequestException('ไม่สามารถจองได้ เนื่องจากกิจกรรมนี้ที่นั่งเต็มแล้ว');
    }

    // 4. เช็คว่า User คนนี้จอง Event นี้ไปหรือยัง (ห้ามจองซ้ำ)
    const reservations = this.db.read();
    const alreadyBooked = reservations.some(
      (r) => r.userId === createDto.userId && r.eventId === createDto.eventId && r.status !== ReservationStatus.CANCELLED
    );
    if (alreadyBooked) {
      throw new BadRequestException('ผู้ใช้งานได้ทำการจองกิจกรรมนี้ไปแล้ว');
    }

    // 5. สร้างการจองใหม่
    const newReservation: Reservation = {
      reservationId: randomUUID(),
      userId: createDto.userId,
      eventId: createDto.eventId,
      reservationDate: new Date(),
      status: ReservationStatus.CONFIRMED,
    };

    reservations.push(newReservation);
    this.db.write(reservations);

    // 6. อัปเดตยอดคนจองใน Event (+1)
    this.eventsService.updateBookingCount(createDto.eventId, 1);

    return newReservation;
  }

  findAllByUser(userId: string): Reservation[] {
    const reservations = this.db.read();
    return reservations.filter(r => r.userId === userId);
  }

  cancel(reservationId: string, userId: string): Reservation {
    const reservations = this.db.read();
    const resIndex = reservations.findIndex(r => r.reservationId === reservationId && r.userId === userId);

    if (resIndex === -1) {
      throw new NotFoundException(`ไม่พบประวัติการจองรหัส ${reservationId} ของผู้ใช้นี้`);
    }

    if (reservations[resIndex].status === ReservationStatus.CANCELLED) {
      throw new BadRequestException('การจองนี้ถูกยกเลิกไปแล้ว');
    }

    // เปลี่ยนสถานะเป็น CANCELLED
    reservations[resIndex].status = ReservationStatus.CANCELLED;
    this.db.write(reservations);

    // คืนที่นั่งให้ Event (-1)
    this.eventsService.updateBookingCount(reservations[resIndex].eventId, -1);

    return reservations[resIndex];
  }
}