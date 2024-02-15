import { Controller, Post, Request, UseGuards, Body } from '@nestjs/common';
import { Public } from '../decorators/public.decorator';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
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
  @Post('login/google')
  async loginWithGoogle(@Request() req, @Body() body: { accessToken: string }) {
    const googleUser = await this.authService.getGoogleUser(body.accessToken);

    const user = await this.userService.updateOrCreate({
      email: googleUser.email,
      firstName: googleUser.given_name,
      lastName: googleUser.family_name,
      avatarUrl: googleUser.picture,
    });

    const accessToken = await this.authService.createAccessToken(user);

    return {
      accessToken,
    };
  }
}
