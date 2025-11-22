import { ProductEntity } from '../entities/product.entity';

export interface IProductRepository {
  findById(id: string): Promise<ProductEntity | null>;
  findAll(categoryId?: string): Promise<ProductEntity[]>;
  create(product: Partial<ProductEntity>): Promise<ProductEntity>;
  update(id: string, product: Partial<ProductEntity>): Promise<ProductEntity>;
  delete(id: string): Promise<void>;
  decreaseStock(id: string, quantity: number): Promise<void>;
}
