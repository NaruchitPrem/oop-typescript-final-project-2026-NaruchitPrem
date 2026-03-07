import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { EventsModule } from '../events/events.module';
import { ParticipantsModule } from '../participants/participants.module';

@Module({
  imports: [EventsModule, ParticipantsModule],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}