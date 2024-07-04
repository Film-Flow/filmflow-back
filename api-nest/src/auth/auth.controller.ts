import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInLocalDto } from './dto/signin-local.dto';
import { ApiTags } from '@nestjs/swagger';
import { GoogleOAuthGuard } from './guards/google.guard';
import { Response } from 'express';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google/signin')
  @UseGuards(GoogleOAuthGuard)
  async googleAuth(@Request() req: any) {
    console.log(req);
    return { msg: 'Qualquer disgraçada' };
  }

  @Get('google/redirect')
  @UseGuards(GoogleOAuthGuard)
  handleRedirect(@Request() req: any) {
    return { token: req.user.accessToken };
  }

  @Post('local/signin')
  async signinLocal(
    @Body() signInLocalDto: SignInLocalDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token, refresh_token } =
      await this.authService.signinLocal(signInLocalDto);

    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    return { access_token };
  }
}
