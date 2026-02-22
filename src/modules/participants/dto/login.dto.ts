import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'johndoe', description: 'ชื่อผู้ใช้งาน' })
  @IsString()
  @IsNotEmpty()
  username!: string;

  @ApiProperty({ example: 'password123', description: 'รหัสผ่าน' })
  @IsString()
  @IsNotEmpty()
  password!: string;
}
