import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { UsersService } from '../users/users.service';

import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';

@Injectable()
export class EmailService {
  private readonly nodemailerTransport: Mail;

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
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

  async sendChangePasswordEmail(email: string, password: string) {
    return this.nodemailerTransport.sendMail({
      to: email,
      subject: 'Ваш пароль до DIPLOMA було змінено',
      html: `Вітаємо! Ваш пароль було змінено адміністратором. Ваш новий пароль: <b>${password}</b>`,
    });
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

  async verifyToken(token: string): Promise<void> {
    try {
      const payload = await this.jwtService.verifyAsync(token);

      const user = await this.userService.findOneByEmail(payload.email);

      if (!user) {
        throw new BadRequestException(
          null,
          'Токен підтвердження є некорректним',
        );
      }

      user.verified = true;

      await this.userService.save(user);
    } catch {
      throw new BadRequestException(null, 'Токен підтвердження є некорректним');
    }
  }
}
