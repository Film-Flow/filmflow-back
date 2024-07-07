import { Body, Controller, Patch, Post, Query } from '@nestjs/common';
import { VerifyEmailCodeService } from './verify-email-code.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { VerifyCodeDto } from './dto/verify-code.dto';

@Controller('verify-email-code')
@ApiTags('verify-email-code')
export class VerifyEmailCodeController {
  constructor(
    private readonly verifyEmailCodeService: VerifyEmailCodeService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Verifica o código de verificação de email.' })
  async verifyCode(
    @Body() verifyCode: VerifyCodeDto,
  ): Promise<{ message: string }> {
    await this.verifyEmailCodeService.verifyCode(verifyCode);

    return {
      message: 'Email verificado com sucesso.',
    };
  }

  @Patch()
  @ApiOperation({ summary: 'Reenvia o código de verificação de email.' })
  async resendCode(@Query() email: string): Promise<{ message: string }> {
    await this.verifyEmailCodeService.resendCode(email);

    return {
      message: 'Código de verificação de email reenviado.',
    };
  }
}
