import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './controllers/orders.controller';
import { OrderService } from './services/order.service';
import { OrderCalculationService } from './services/order-calculation.service';
import { OrderRepository } from './repositories/order.repository';
import { OrderEntity } from './entities/order.entity';
import { OrderItemEntity } from './entities/order-item.entity';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, OrderItemEntity]),
    ProductsModule,
  ],
  controllers: [OrdersController],
  providers: [OrderService, OrderCalculationService, OrderRepository],
  exports: [OrderService],
})
export class OrdersModule {}
