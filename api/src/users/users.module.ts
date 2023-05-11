import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { EmailModule } from '../email/email.module';
import { UserSubscriber } from './user.subscriber';

@Module({
  imports: [forwardRef(() => EmailModule), TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UserSubscriber],
  exports: [UsersService],
})
export class UsersModule {}
