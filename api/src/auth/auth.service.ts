import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

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
