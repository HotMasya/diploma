import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateOAuthUser(data: Partial<User>) {
    let user = await this.userService.findOneByEmail(data.email);

    if (!user) {
      user = await this.userService.create(data);
    }

    return user;
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findOneByEmail(email);

    if (user) {
      const paswordsMatch = await compare(password, user.password);

      if (paswordsMatch) {
        return user;
      }
    }

    return null;
  }

  async createAccessToken(user: User): Promise<string> {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.signAsync(payload);
  }

  async getGoogleUser(accessToken: string) {
    const user = await fetch(
      'https://www.googleapis.com/oauth2/v2/userinfo?alt=json',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    ).then((res) => res.json());

    return user;
  }
}
