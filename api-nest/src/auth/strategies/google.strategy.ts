import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import { AuthProviderEnum } from 'src/common/enums/auth-provider.enum';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private authService: AuthService,
    configService: ConfigService,
  ) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: 'http://localhost:3000/auth/google/redirect',
      scope: ['profile', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refresh_token: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { displayName, emails, photos } = profile;

    const user = {
      email: emails[0].value,
      display_name: displayName,
      photo: photos[0].value,
      auth_provider: AuthProviderEnum.GOOGLE,
      accessToken,
      refresh_token,
    };

    await this.authService.validateUser(user);

    done(null, user);
  }
}
