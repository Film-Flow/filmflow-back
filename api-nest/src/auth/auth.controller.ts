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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
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
  @ApiOperation({ summary: 'Inicia autenticação com o google.' })
  @UseGuards(GoogleOAuthGuard)
  async googleAuth() {
    return { message: 'Autenticação com o google bem sucedida' };
  }

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
  @UseGuards(GoogleOAuthGuard)
  @Get('google/redirect')
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
  @Post('local/signin')
  @ApiOperation({ summary: 'Inicia autenticação com email e senha.' })
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
  @ApiOperation({ summary: 'Recria token de acesso do usuário' })
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
