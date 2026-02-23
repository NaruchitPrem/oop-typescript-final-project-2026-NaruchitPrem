import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, MinLength , Matches } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'johndoe', description: 'ชื่อผู้ใช้งาน' })
  @IsString()
  @IsNotEmpty()
  username!: string;

  @ApiProperty({ example: 'password123', description: 'รหัสผ่าน' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร' })
  password!: string;

  @ApiProperty({ example: 'john@example.com', description: 'อีเมล' })
  @IsEmail({}, { message: 'รูปแบบอีเมลไม่ถูกต้อง' })
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ example: 'John', description: 'ชื่อจริง' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Zก-๙]+$/, { message: 'ชื่อจริงต้องประกอบด้วยตัวอักษรเท่านั้น ห้ามมีตัวเลขหรือสัญลักษณ์' })
  firstName!: string;

  @ApiProperty({ example: 'Doe', description: 'นามสกุล' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Zก-๙]+$/, { message: 'นามสกุลต้องประกอบด้วยตัวอักษรเท่านั้น' })
  lastName!: string;

  @ApiProperty({ example: '0812345678', description: 'เบอร์โทรศัพท์' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9]{9,10}$/, { message: 'เบอร์โทรศัพท์ต้องเป็นตัวเลขจำนวน 9-10 หลักเท่านั้น' })
  phoneNumber!: string;
}
