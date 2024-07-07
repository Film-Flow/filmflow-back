import { PartialType } from '@nestjs/swagger';
import { CreateResetPassCodeDto } from './create-reset-pass-code.dto';

export class UpdateResetPassCodeDto extends PartialType(CreateResetPassCodeDto) {}
