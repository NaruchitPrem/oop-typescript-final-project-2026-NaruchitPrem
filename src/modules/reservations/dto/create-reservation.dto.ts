import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateReservationDto {
  @ApiProperty({ example: 'uuid-ของ-user', description: 'รหัสผู้ใช้งาน (Participant)' })
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @ApiProperty({ example: 'uuid-ของ-event', description: 'รหัสกิจกรรม (Event)' })
  @IsString()
  @IsNotEmpty()
  eventId!: string;
}