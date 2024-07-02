import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInLocalDto } from './dto/signin-local.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/local/signin')
  signinLocal(@Body() signInLocalDto: SignInLocalDto) {
    this.authService.signinLocal(signInLocalDto);
  }

  @Post('/logout')
  logout() {
    this.authService.logout();
  }
}
