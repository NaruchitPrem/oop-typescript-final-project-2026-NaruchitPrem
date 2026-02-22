import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { ApiResponse } from '../../common/interfaces/api-response.interface';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Auth & Participants')
@Controller() // ไม่ใส่ Prefix รวม เพราะเราจะแยก Route ด้านใน
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  // ---- Auth Routes ----
  @Post('auth/register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'สมัครสมาชิกใหม่' })
  register(@Body() registerDto: RegisterDto): ApiResponse<unknown> {
    const result = this.participantsService.register(registerDto);
    return {
      success: true,
      message: 'สมัครสมาชิกสำเร็จ',
      data: result,
    };
  }

  @Post('auth/login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'เข้าสู่ระบบ' })
  login(@Body() loginDto: LoginDto): ApiResponse<unknown> {
    const result = this.participantsService.login(loginDto);
    return {
      success: true,
      message: 'เข้าสู่ระบบสำเร็จ',
      data: result,
    };
  }

  // ---- Participant Routes ----
  @Get('participants')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'ดึงข้อมูลผู้ใช้งานทั้งหมด' })
  findAll(): ApiResponse<unknown[]> {
    const result = this.participantsService.findAll();
    return {
      success: true,
      message: 'ดึงข้อมูลผู้ใช้งานทั้งหมดสำเร็จ',
      data: result,
    };
  }

  @Get('participants/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'ดึงข้อมูลผู้ใช้งานตาม ID' })
  findOne(@Param('id') id: string): ApiResponse<unknown> {
    const result = this.participantsService.findOne(id);
    return {
      success: true,
      message: 'ดึงข้อมูลผู้ใช้งานสำเร็จ',
      data: result,
    };
  }

  @Patch('participants/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'แก้ไขข้อมูลโปรไฟล์ผู้ใช้งาน' })
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateParticipantDto,
  ): ApiResponse<unknown> {
    const result = this.participantsService.update(id, updateDto);
    return {
      success: true,
      message: 'อัปเดตข้อมูลผู้ใช้งานสำเร็จ',
      data: result,
    };
  }

  @Delete('participants/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'ลบผู้ใช้งาน' })
  remove(@Param('id') id: string): ApiResponse<null> {
    this.participantsService.remove(id);
    return {
      success: true,
      message: 'ลบผู้ใช้งานสำเร็จ',
      data: null,
    };
  }
}
