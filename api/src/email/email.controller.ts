import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { Public } from '../decorators/public.decorator';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Public()
  @Post('verification')
  async sendVerification(@Body('email') email: string) {
    return this.emailService.sendConfirmationEmail(email);
  }
}
