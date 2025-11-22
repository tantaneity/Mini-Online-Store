import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../users/services/user.service';
import { PasswordHashService } from '../../users/services/password-hash.service';
import { LoginDto } from '../../users/dto/login.dto';
import { RegisterDto } from '../../users/dto/register.dto';
import { UserEntity } from '../../users/entities/user.entity';

export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  user: UserEntity;
  accessToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly passwordHashService: PasswordHashService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    const passwordHash = await this.passwordHashService.hash(
      registerDto.password,
    );

    const user = await this.userService.createUser(registerDto, passwordHash);

    const accessToken = this.generateToken(user);

    return { user, accessToken };
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const user = await this.userService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.passwordHashService.compare(
      loginDto.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Account is disabled');
    }

    const accessToken = this.generateToken(user);

    return { user, accessToken };
  }

  async validateUser(userId: string): Promise<UserEntity> {
    return this.userService.findById(userId);
  }

  private generateToken(user: UserEntity): string {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return this.jwtService.sign(payload);
  }
}
