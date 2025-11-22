import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderRepository } from '../repositories/order.repository';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { OrderEntity } from '../entities/order.entity';
import { ProductService } from '../../products/services/product.service';
import { OrderCalculationService } from './order-calculation.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly productService: ProductService,
    private readonly orderCalculationService: OrderCalculationService,
  ) {}

  async findById(id: string): Promise<OrderEntity> {
    const order = await this.orderRepository.findById(id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async findByUserId(userId: string): Promise<OrderEntity[]> {
    return this.orderRepository.findByUserId(userId);
  }

  async findAll(): Promise<OrderEntity[]> {
    return this.orderRepository.findAll();
  }

  async createOrder(
    userId: string,
    createDto: CreateOrderDto,
  ): Promise<OrderEntity> {
    const products = await Promise.all(
      createDto.items.map((item) =>
        this.productService.findById(item.productId),
      ),
    );

    for (const item of createDto.items) {
      await this.productService.checkStockAvailability(
        item.productId,
        item.quantity,
      );
    }

    const totalAmount = this.orderCalculationService.calculateTotalAmount(
      createDto.items,
      products,
    );

    const orderItems = this.orderCalculationService.prepareOrderItems(
      createDto.items,
      products,
    );

    const order = await this.orderRepository.create({
      userId,
      shippingAddress: createDto.shippingAddress,
      totalAmount,
      items: orderItems as OrderEntity['items'],
    });

    for (const item of createDto.items) {
      await this.productService.decreaseStock(item.productId, item.quantity);
    }

    return order;
  }

  async updateOrder(
    id: string,
    updateDto: UpdateOrderDto,
  ): Promise<OrderEntity> {
    await this.findById(id);
    return this.orderRepository.update(id, updateDto);
  }
}
