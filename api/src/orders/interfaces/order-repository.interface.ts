import { OrderEntity } from '../entities/order.entity';

export interface IOrderRepository {
  findById(id: string): Promise<OrderEntity | null>;
  findByUserId(userId: string): Promise<OrderEntity[]>;
  create(order: Partial<OrderEntity>): Promise<OrderEntity>;
  update(id: string, order: Partial<OrderEntity>): Promise<OrderEntity>;
  findAll(): Promise<OrderEntity[]>;
}
