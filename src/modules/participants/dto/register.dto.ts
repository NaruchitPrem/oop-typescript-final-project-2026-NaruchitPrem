import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';

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
  firstName!: string;

  @ApiProperty({ example: 'Doe', description: 'นามสกุล' })
  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @ApiProperty({ example: '0812345678', description: 'เบอร์โทรศัพท์' })
  @IsString()
  @IsNotEmpty()
  phoneNumber!: string;
}
