import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from '../entities/order.entity';
import { IOrderRepository } from '../interfaces/order-repository.interface';

@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly repository: Repository<OrderEntity>,
  ) {}

  async findById(id: string): Promise<OrderEntity | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['items', 'items.product', 'user'],
    });
  }

  async findByUserId(userId: string): Promise<OrderEntity[]> {
    return this.repository.find({
      where: { userId },
      relations: ['items', 'items.product'],
      order: { createdAt: 'DESC' },
    });
  }

  async create(order: Partial<OrderEntity>): Promise<OrderEntity> {
    const newOrder = this.repository.create(order);
    return this.repository.save(newOrder);
  }

  async update(id: string, order: Partial<OrderEntity>): Promise<OrderEntity> {
    await this.repository.update(id, order);
    const updated = await this.findById(id);
    if (!updated) {
      throw new Error('Order not found');
    }
    return updated;
  }

  async findAll(): Promise<OrderEntity[]> {
    return this.repository.find({
      relations: ['items', 'items.product', 'user'],
      order: { createdAt: 'DESC' },
    });
  }
}
