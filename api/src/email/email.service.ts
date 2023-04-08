import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class EmailService {
  private readonly nodemailerTransport: Mail;

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.nodemailerTransport = createTransport({
      service: configService.getOrThrow('EMAIL_SERVICE'),
      auth: {
        user: configService.getOrThrow('EMAIL_USERNAME'),
        pass: configService.getOrThrow('EMAIL_PASSWORD'),
      },
    });
  }

  async sendMail(options: Mail.Options) {
    return this.nodemailerTransport.sendMail(options);
  }

  async sendConfirmationEmail(email: string) {
    const payload = { email };
    const token = await this.jwtService.signAsync(payload);
    const frontendBaseUrl = this.configService.getOrThrow('FRONTEND_BASE_URL');
    const verificationUrl = `${frontendBaseUrl}/auth?verify=${token}`;

    return this.nodemailerTransport.sendMail({
      to: email,
      subject: 'Підтвердження вашої електронної пошти',
      text:
        'Для подальшої роботи у застосунку DIPLOMA ви маєте підтвердити вашу пошту. Для цього перейдіть за цим посиланням: ' +
        verificationUrl,
    });
  }
}
