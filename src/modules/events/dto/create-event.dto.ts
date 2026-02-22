import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDateString, IsInt, Min, IsEnum } from 'class-validator';
import { EventStatus } from '../../../common/enums/event-status.enum';

export class CreateEventDto {
  @ApiProperty({ example: 'NestJS Workshop', description: 'ชื่อกิจกรรม' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'เรียนรู้การสร้าง API ด้วย NestJS', description: 'รายละเอียดกิจกรรม' })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty({ example: '2026-03-01T09:00:00Z', description: 'เวลาเริ่มกิจกรรม' })
  @IsDateString()
  startTime!: string;

  @ApiProperty({ example: '2026-03-01T16:00:00Z', description: 'เวลาจบกิจกรรม' })
  @IsDateString()
  endTime!: string;

  @ApiProperty({ example: 'Bangkok, Thailand', description: 'สถานที่จัดงาน' })
  @IsString()
  @IsNotEmpty()
  location!: string;

  @ApiProperty({ example: 50, description: 'จำนวนคนที่รับสมัคร' })
  @IsInt()
  @Min(1)
  capacity!: number;

  @ApiProperty({ enum: EventStatus, example: EventStatus.UPCOMING, description: 'สถานะเริ่มต้นของกิจกรรม' })
  @IsEnum(EventStatus)
  status!: EventStatus;
}