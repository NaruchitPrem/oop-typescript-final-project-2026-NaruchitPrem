import {
  Injectable,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { Participant } from '../../common/interfaces/participant.interface';
import { Role } from '../../common/enums/role.enum';
import { JsonDB } from '../../common/utils/json-db.util';
import { randomUUID } from 'crypto';

@Injectable()
export class ParticipantsService {
  private readonly db: JsonDB<Participant>;

  constructor() {
    this.db = new JsonDB<Participant>('participants');
  }

  register(registerDto: RegisterDto): Omit<Participant, 'password'> {
    const participants = this.db.read();

    // เช็คว่า Username หรือ Email ซ้ำหรือไม่
    const isDuplicate = participants.some(
      (p) =>
        p.username === registerDto.username || p.email === registerDto.email,
    );
    if (isDuplicate) {
      throw new ConflictException('Username หรือ Email นี้มีผู้ใช้งานแล้ว'); // โยน 409 Conflict
    }

    const now = new Date();
    const newParticipant: Participant = {
      userId: randomUUID(),
      username: registerDto.username,
      password: registerDto.password, // ของจริงต้อง Hash (เช่น bcrypt) ก่อนเซฟนะครับ
      email: registerDto.email,
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      phoneNumber: registerDto.phoneNumber,
      role: Role.PARTICIPANT, // กำหนด Role อัตโนมัติ
      isActive: true, // กำหนดค่าเริ่มต้นเป็น true
      createdAt: now,
    };

    participants.push(newParticipant);
    this.db.write(participants);

    // คืนค่าข้อมูลกลับไปโดยตัดรหัสผ่านทิ้งเพื่อความปลอดภัย
    const { password, ...result } = newParticipant;
    return result;
  }

  login(loginDto: LoginDto): Omit<Participant, 'password'> {
    const participants = this.db.read();

    // หา User ที่ Username และ Password ตรงกัน
    const user = participants.find(
      (p) =>
        p.username === loginDto.username && p.password === loginDto.password,
    );

    if (!user) {
      throw new UnauthorizedException('Username หรือ Password ไม่ถูกต้อง'); // โยน 401 Unauthorized
    }

    const { password, ...result } = user;
    return result; // สมมติว่าคืนเป็นข้อมูล User แทน JWT Token ในโปรเจกต์นี้
  }

  findAll(): Omit<Participant, 'password'>[] {
    const participants = this.db.read();
    return participants.map(({ password, ...rest }) => rest);
  }

  findOne(id: string): Omit<Participant, 'password'> {
    const participants = this.db.read();
    const user = participants.find((p) => p.userId === id);

    if (!user) {
      throw new NotFoundException(`ไม่พบผู้ใช้งานรหัส ${id}`);
    }

    const { password, ...result } = user;
    return result;
  }

  update(
    id: string,
    updateDto: UpdateParticipantDto,
  ): Omit<Participant, 'password'> {
    const participants = this.db.read();
    const userIndex = participants.findIndex((p) => p.userId === id);

    if (userIndex === -1) {
      throw new NotFoundException(`ไม่พบผู้ใช้งานรหัส ${id}`);
    }

    const updatedUser: Participant = {
      ...participants[userIndex],
      ...updateDto,
    };

    participants[userIndex] = updatedUser;
    this.db.write(participants);

    const { password, ...result } = updatedUser;
    return result;
  }

  remove(id: string): void {
    const participants = this.db.read();
    const userIndex = participants.findIndex((p) => p.userId === id);

    if (userIndex === -1) {
      throw new NotFoundException(`ไม่พบผู้ใช้งานรหัส ${id} ให้ลบ`);
    }

    participants.splice(userIndex, 1);
    this.db.write(participants);
  }
}
