import { Controller, Get, Post, Body, Patch, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ApiResponse } from '../../common/interfaces/api-response.interface';
import { Reservation } from '../../common/interfaces/reservation.interface';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Reservations')
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'จองกิจกรรม (Participant)' })
  create(@Body() createReservationDto: CreateReservationDto): ApiResponse<Reservation> {
    const result = this.reservationsService.create(createReservationDto);
    return {
      success: true,
      message: 'จองกิจกรรมสำเร็จ',
      data: result,
    };
  }

  @Get('user/:userId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'ดูประวัติการจองของฉัน (Participant)' })
  findAllByUser(@Param('userId') userId: string): ApiResponse<Reservation[]> {
    const result = this.reservationsService.findAllByUser(userId);
    return {
      success: true,
      message: 'ดึงข้อมูลประวัติการจองสำเร็จ',
      data: result,
    };
  }

  @Patch(':id/cancel')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'ยกเลิกการจองกิจกรรม (Participant)' })
  cancel(
    @Param('id') id: string,
    @Body('userId') userId: string // รับ userId มาเพื่อยืนยันว่าเป็นเจ้าของการจองจริงๆ
  ): ApiResponse<Reservation> {
    const result = this.reservationsService.cancel(id, userId);
    return {
      success: true,
      message: 'ยกเลิกการจองสำเร็จ',
      data: result,
    };
  }
}