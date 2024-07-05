import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignInLocalDto } from './dto/signin-local.dto';
import { MessagesHelper } from 'src/helpers/messages.helper';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { OutsideProviderDto } from './dto/signup-outside-provider.dto';
import { ConfigService } from '@nestjs/config';
import { Payload } from 'src/common/types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async handleSigninLocal({ email, password }: SignInLocalDto) {
    const user = await this.userService.findByEmail(email);

    if (!user || user?.auth_provider !== 'LOCAL') {
      throw new NotFoundException(MessagesHelper.USER_NOT_FOUND);
    }

    const isMatch = await compare(password, user.password_hash);

    if (!isMatch) {
      throw new UnauthorizedException(MessagesHelper.INVALID_CREDENTIALS);
    }

    const accessTokenPayload: Payload = {
      sub: user.id,
      expiresIn: new Date(new Date().getTime() + 2 * 60 * 60 * 1000), // Expira em 2 horas
    };

    const refreshTokenPayload: Payload = {
      sub: user.id,
      expiresIn: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // Expira em 7 dias
    };

    return {
      access_token: await this.jwtService.signAsync(accessTokenPayload, {
        secret: this.configService.get('ACCESS_TOKEN_JWT_SECRET'),
        expiresIn: '2h',
      }),
      refresh_token: await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.configService.get('REFRESH_TOKEN_JWT_SECRET'),
        expiresIn: '7d',
      }),
    };
  }

  async validateUser(data: OutsideProviderDto) {
    const user = await this.userService.findByEmail(data.email);

    let userId: string = user?.id;

    if (!user) {
      const newUser = await this.userService.createUserFromOutsideProvider({
        email: data.email,
        display_name: data.display_name,
        photo: data.photo,
        auth_provider: data.auth_provider,
      });

      userId = newUser.id;
    }

    const accessTokenPayload = {
      sub: userId,
      expiresIn: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
    };

    const refreshTokenPayload = {
      sub: userId,
      expiresIn: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
    };

    return {
      access_token: await this.jwtService.signAsync(accessTokenPayload, {
        secret: this.configService.get('ACCESS_TOKEN_JWT_SECRET'),
        expiresIn: '2h',
      }),
      refresh_token: await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.configService.get('REFRESH_TOKEN_JWT_SECRET'),
        expiresIn: '7d',
      }),
    };
  }

  async handleRefreshToken(id: string) {
    const user = await this.userService.findById(id);

    if (!user) {
      throw new NotFoundException(MessagesHelper.USER_NOT_FOUND);
    }

    const accessTokenPayload = {
      sub: user.id,
      expiresIn: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
    };

    const refreshTokenPayload = {
      sub: user.id,
      expiresIn: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
    };

    return {
      access_token: await this.jwtService.signAsync(accessTokenPayload, {
        secret: this.configService.get('ACCESS_TOKEN_JWT_SECRET'),
        expiresIn: '2h',
      }),
      refresh_token: await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.configService.get('REFRESH_TOKEN_JWT_SECRET'),
        expiresIn: '7d',
      }),
    };
  }
}
