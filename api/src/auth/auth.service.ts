import { Injectable } from '@nestjs/common';
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
}
