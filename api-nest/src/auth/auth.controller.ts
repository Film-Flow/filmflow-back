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
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GoogleOAuthGuard } from './guards/google.guard';
import { Request as ExpressRequest, Response } from 'express';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { Req } from 'src/common/types';
import { AuthEntity } from './entities/auth.entity';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google/signin')
  @UseGuards(GoogleOAuthGuard)
  async googleAuth() {
    return { message: 'Autenticação com o google bem sucedida' };
  }

  @Get('google/redirect')
  @UseGuards(GoogleOAuthGuard)
  handleRedirect(
    @Request()
    req: ExpressRequest & {
      user: { access_token: string; refresh_token: string };
    },
    @Res({ passthrough: true }) res: Response,
  ): AuthEntity {
    const { access_token, refresh_token } = req.user;

    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    return { access_token };
  }

  @Post('local/signin')
  async handleSigninLocal(
    @Body() signInLocalDto: SignInLocalDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthEntity> {
    const { access_token, refresh_token } =
      await this.authService.handleSigninLocal(signInLocalDto);

    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    return { access_token };
  }

  @ApiBearerAuth()
  @ApiResponse({
    headers: {
      'Set-Cookie': {
        description: 'Refresh token',
        schema: {
          type: 'string',
        },
      },
    },
  })
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async handleRefreshToken(
    @Request() req: Req,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthEntity> {
    const { access_token, refresh_token } =
      await this.authService.handleRefreshToken(req.user.sub);

    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    return { access_token };
  }
}
