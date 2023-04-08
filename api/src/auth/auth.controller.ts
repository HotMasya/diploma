import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';

import { Public } from '../decorators/public.decorator';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { GoogleOAuthGuard } from './guards/google-oauth.guard';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  async login(@Request() req) {
    const accessToken = await this.authService.createAccessToken(req.user);

    return {
      accessToken,
    };
  }

  @Public()
  @Post('verify')
  async verify(@Body('token') token: string) {
    return this.authService.verifyToken(token);
  }

  @UseGuards(GoogleOAuthGuard)
  @Public()
  @Get('google')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  authWithGoogle() {}

  @UseGuards(GoogleOAuthGuard)
  @Public()
  @Get('google-redirect')
  async googleAuthRedirect(@Request() req, @Response() res) {
    const accessToken = await this.authService.createAccessToken(req.user);

    res.redirect(this.configService.getOrThrow('FRONTEND_BASE_URL') + '/auth');
  }
}
