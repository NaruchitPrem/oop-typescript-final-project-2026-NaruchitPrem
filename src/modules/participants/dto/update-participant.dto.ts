import { PartialType, OmitType } from '@nestjs/swagger';
import { RegisterDto } from './register.dto';

export class UpdateParticipantDto extends PartialType(
  OmitType(RegisterDto, ['username', 'password'] as const),
) {}
