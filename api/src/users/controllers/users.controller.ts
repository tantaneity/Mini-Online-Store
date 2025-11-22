import {
  Controller,
  Get,
  Put,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { UserEntity, UserRole } from '../entities/user.entity';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  async getCurrentUser(@CurrentUser() user: UserEntity) {
    return user;
  }

  @Put('me')
  async updateCurrentUser(
    @CurrentUser() user: UserEntity,
    @Body() updateDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(user.id, updateDto);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN)
  async getUserById(@Param('id') id: string) {
    return this.userService.findById(id);
  }
}
