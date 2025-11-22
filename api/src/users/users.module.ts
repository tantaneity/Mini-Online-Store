import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users.controller';
import { UserService } from './services/user.service';
import { PasswordHashService } from './services/password-hash.service';
import { UserRepository } from './repositories/user.repository';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UserService, PasswordHashService, UserRepository],
  exports: [UserService, PasswordHashService, UserRepository],
})
export class UsersModule {}
