import { Controller, Post, Body } from '@nestjs/common';
import { ResetPassCodeService } from './reset-pass-code.service';
import { CreateResetPassCodeDto } from './dto/create-reset-pass-code.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('reset-pass-code')
@ApiTags('reset-pass-code')
export class ResetPassCodeController {
  constructor(private readonly resetPassCodeService: ResetPassCodeService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um código de recuperação de senha.' })
  create(@Body() createResetPassCodeDto: CreateResetPassCodeDto) {
    return this.resetPassCodeService.create(createResetPassCodeDto);
  }
}
