import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';
import { IProductRepository } from '../interfaces/product-repository.interface';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly repository: Repository<ProductEntity>,
  ) {}

  async findById(id: string): Promise<ProductEntity | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['category'],
    });
  }

  async findAll(categoryId?: string): Promise<ProductEntity[]> {
    const query = this.repository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .where('product.isAvailable = :isAvailable', { isAvailable: true });

    if (categoryId) {
      query.andWhere('product.categoryId = :categoryId', { categoryId });
    }

    return query.getMany();
  }

  async create(product: Partial<ProductEntity>): Promise<ProductEntity> {
    const newProduct = this.repository.create(product);
    return this.repository.save(newProduct);
  }

  async update(
    id: string,
    product: Partial<ProductEntity>,
  ): Promise<ProductEntity> {
    await this.repository.update(id, product);
    const updated = await this.findById(id);
    if (!updated) {
      throw new Error('Product not found');
    }
    return updated;
  }

  async delete(id: string): Promise<void> {
    await this.repository.update(id, { isAvailable: false });
  }

  async decreaseStock(id: string, quantity: number): Promise<void> {
    await this.repository.decrement({ id }, 'stock', quantity);
  }
}
