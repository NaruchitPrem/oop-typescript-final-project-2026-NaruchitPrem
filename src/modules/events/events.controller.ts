import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from '../../common/interfaces/event.interface';
import { ApiResponse } from '../../common/interfaces/api-response.interface';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED) // คืนค่า 201 ตาม Requirement
  @ApiOperation({ summary: 'สร้างกิจกรรมใหม่ (Admin)' })
  create(@Body() createEventDto: CreateEventDto): ApiResponse<Event> {
    const result = this.eventsService.create(createEventDto);
    return {
      success: true,
      message: 'สร้างกิจกรรมสำเร็จ',
      data: result,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK) // คืนค่า 200 ตาม Requirement
  @ApiOperation({ summary: 'ดึงข้อมูลกิจกรรมทั้งหมด' })
  findAll(): ApiResponse<Event[]> {
    const result = this.eventsService.findAll();
    return {
      success: true,
      message: 'ดึงข้อมูลกิจกรรมสำเร็จ',
      data: result,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'ดึงข้อมูลกิจกรรมตาม ID' })
  findOne(@Param('id') id: string): ApiResponse<Event> {
    const result = this.eventsService.findOne(id);
    return {
      success: true,
      message: 'ดึงข้อมูลกิจกรรมสำเร็จ',
      data: result,
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'แก้ไขข้อมูลกิจกรรม' })
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto): ApiResponse<Event> {
    const result = this.eventsService.update(id, updateEventDto);
    return {
      success: true,
      message: 'อัปเดตกิจกรรมสำเร็จ',
      data: result,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'ลบกิจกรรม' })
  remove(@Param('id') id: string): ApiResponse<null> {
    this.eventsService.remove(id);
    return {
      success: true,
      message: 'ลบกิจกรรมสำเร็จ',
      data: null,
    };
  }
}