import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { CategoryEntity } from '../../categories/entities/category.entity';
import { OrderItemEntity } from '../../orders/entities/order-item.entity';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ default: 0 })
  stock: number;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ default: true })
  isAvailable: boolean;

  @Column()
  categoryId: string;

  @ManyToOne(() => CategoryEntity, { lazy: true })
  @JoinColumn({ name: 'categoryId' })
  category: CategoryEntity;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.product, {
    lazy: true,
  })
  orderItems: OrderItemEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
