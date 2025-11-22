import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { UserEntity, UserRole } from '../../users/entities/user.entity';

@Controller('orders')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrdersController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @Roles(UserRole.ADMIN)
  async getAllOrders() {
    return this.orderService.findAll();
  }

  @Get('my')
  async getMyOrders(@CurrentUser() user: UserEntity) {
    return this.orderService.findByUserId(user.id);
  }

  @Get(':id')
  async getOrderById(@Param('id') id: string, @CurrentUser() user: UserEntity) {
    const order = await this.orderService.findById(id);

    if (user.role !== UserRole.ADMIN && order.userId !== user.id) {
      throw new Error('Access denied');
    }

    return order;
  }

  @Post()
  async createOrder(
    @CurrentUser() user: UserEntity,
    @Body() createDto: CreateOrderDto,
  ) {
    return this.orderService.createOrder(user.id, createDto);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  async updateOrder(
    @Param('id') id: string,
    @Body() updateDto: UpdateOrderDto,
  ) {
    return this.orderService.updateOrder(id, updateDto);
  }
}
