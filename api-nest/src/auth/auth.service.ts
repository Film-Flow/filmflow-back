import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignInLocalDto } from './dto/signin-local.dto';
import { MessagesHelper } from 'src/helpers/messages.helper';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signinLocal({
    email,
    password,
  }: SignInLocalDto): Promise<{ access_token: string }> {
    const user = await this.userService.findByEmail(email);

    const isMatch = await compare(password, user.password_hash);

    if (!isMatch) {
      throw new UnauthorizedException(MessagesHelper.INVALID_CREDENTIALS);
    }

    const payload = {
      sub: user.id,
      expiresIn: new Date(new Date().getTime() + 2 * 60 * 60 * 1000), // Expira em 2 horas
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  logout() {}
}
