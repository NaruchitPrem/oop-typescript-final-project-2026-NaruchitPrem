import { PartialType, OmitType } from '@nestjs/swagger';
import { RegisterDto } from './register.dto';

// ตัด username และ password ออก ไม่ให้อัปเดตผ่าน API นี้ (แก้ได้แค่ชื่อ สกุล เบอร์ อีเมล)
export class UpdateParticipantDto extends PartialType(
  OmitType(RegisterDto, ['username', 'password'] as const),
) {}
