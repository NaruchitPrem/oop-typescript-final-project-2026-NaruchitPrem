import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty } from 'class-validator';

export class CreateReservationDto {
  @ApiProperty({ example: 'uuid-ของ-user', description: 'รหัสผู้ใช้งาน (Participant)' })
  @IsUUID('4', { message: 'userId ต้องเป็นรูปแบบ UUID v4 เท่านั้น' })
  @IsNotEmpty()
  userId!: string;

  @ApiProperty({ example: 'uuid-ของ-event', description: 'รหัสกิจกรรม (Event)' })
  @IsUUID('4', { message: 'eventId ต้องเป็นรูปแบบ UUID v4 เท่านั้น' })
  @IsNotEmpty()
  eventId!: string;
}