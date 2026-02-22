import { PartialType } from '@nestjs/swagger';
import { CreateEventDto } from './create-event.dto';

// ทำให้ฟิลด์ทั้งหมดแก้ไขแบบทีละค่าได้
export class UpdateEventDto extends PartialType(CreateEventDto) {}