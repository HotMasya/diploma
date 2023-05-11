import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

@Injectable()
export class JwtVerificationConfigService implements JwtOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createJwtOptions(): JwtModuleOptions | Promise<JwtModuleOptions> {
    return {
      secret: this.configService.getOrThrow('JWT_VERIFICATION_SECRET'),
      signOptions: {
        expiresIn: this.configService.getOrThrow('JWT_VERIFICATION_EXPIRES_IN'),
      },
    };
  }
}
