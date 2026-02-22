import { Module } from '@nestjs/common';
import { ParticipantsModule } from './modules/participants/participants.module';

@Module({
  imports: [ParticipantsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
