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

export type Payload = {
  sub: string;
  expiresIn: Date;
};

export type Req = {
  user: Payload;
};
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signinLocal({
    email,
    password,
  }: SignInLocalDto): Promise<{ access_token: string; refresh_token: string }> {
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

    if (user) return user;

    const newUser = this.userService.createUserFromOutsideProvider({
      email: data.email,
      display_name: data.display_name,
      photo: data.photo,
      auth_provider: data.auth_provider,
    });

    return newUser;
  }

  logout() {}
}
