import { Module } from '@nestjs/common';
import { ParticipantsModule } from './modules/participants/participants.module';
import { EventsModule } from './modules/events/events.module';
import { ReservationsModule } from './modules/reservations/reservations.module';

@Module({
  imports: [
    ParticipantsModule,
    EventsModule,
    ReservationsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}