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
import { Participant } from '../../common/interfaces/participant.interface';

// Type alias สำหรับ Participant without password
type ParticipantResponse = Omit<Participant, 'password'>;

@Controller() // ไม่ใส่ Prefix รวม เพราะเราจะแยก Route ด้านใน
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  // ---- Auth Routes ----
  @ApiTags('Auth & Participants')
  @Post('auth/register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'สมัครสมาชิกใหม่' })
  register(@Body() registerDto: RegisterDto): ApiResponse<ParticipantResponse> {
    const result = this.participantsService.register(registerDto);
    return {
      success: true,
      message: 'สมัครสมาชิกสำเร็จ',
      data: result,
    };
  }

  @ApiTags('Auth & Participants')
  @Post('auth/login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'เข้าสู่ระบบ' })
  login(@Body() loginDto: LoginDto): ApiResponse<ParticipantResponse> {
    const result = this.participantsService.login(loginDto);
    return {
      success: true,
      message: 'เข้าสู่ระบบสำเร็จ',
      data: result,
    };
  }

  // ---- Participant Routes ----
  @ApiTags('Participants Management')
  @Get('participants')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'ดึงข้อมูลผู้ใช้งานทั้งหมด' })
  findAll(): ApiResponse<ParticipantResponse[]> {
    const result = this.participantsService.findAll();
    return {
      success: true,
      message: 'ดึงข้อมูลผู้ใช้งานทั้งหมดสำเร็จ',
      data: result,
    };
  }

  @ApiTags('Participants Management')
  @Get('participants/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'ดึงข้อมูลผู้ใช้งานตาม ID' })
  findOne(@Param('id') id: string): ApiResponse<ParticipantResponse> {
    const result = this.participantsService.findOne(id);
    return {
      success: true,
      message: 'ดึงข้อมูลผู้ใช้งานสำเร็จ',
      data: result,
    };
  }

  @ApiTags('Auth & Participants')
  @Patch('participants/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'แก้ไขข้อมูลโปรไฟล์ผู้ใช้งาน' })
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateParticipantDto,
  ): ApiResponse<ParticipantResponse> {
    const result = this.participantsService.update(id, updateDto);
    return {
      success: true,
      message: 'อัปเดตข้อมูลผู้ใช้งานสำเร็จ',
      data: result,
    };
  }

  @ApiTags('Auth & Participants')
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
