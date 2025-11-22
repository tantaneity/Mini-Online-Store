import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { RegisterDto } from '../dto/register.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findByEmail(email);
  }

  async createUser(
    registerDto: RegisterDto,
    passwordHash: string,
  ): Promise<UserEntity> {
    const existingUser = await this.userRepository.findByEmail(
      registerDto.email,
    );

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    return this.userRepository.create({
      email: registerDto.email,
      passwordHash,
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      phone: registerDto.phone,
    });
  }

  async updateUser(id: string, updateDto: UpdateUserDto): Promise<UserEntity> {
    await this.findById(id);

    if (updateDto.email) {
      const existingUser = await this.userRepository.findByEmail(
        updateDto.email,
      );
      if (existingUser && existingUser.id !== id) {
        throw new ConflictException('Email already in use');
      }
    }

    return this.userRepository.update(id, updateDto);
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.findAll();
  }
}
