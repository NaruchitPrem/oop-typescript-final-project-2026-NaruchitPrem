import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { EventsModule } from '../events/events.module';
import { ParticipantsModule } from '../participants/participants.module';

@Module({
  imports: [EventsModule, ParticipantsModule], // ดึง Module อื่นมาเชื่อมต่อ
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}