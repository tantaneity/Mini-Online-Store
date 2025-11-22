import { CategoryEntity } from '../entities/category.entity';

export interface ICategoryRepository {
  findById(id: string): Promise<CategoryEntity | null>;
  findAll(): Promise<CategoryEntity[]>;
  create(category: Partial<CategoryEntity>): Promise<CategoryEntity>;
  update(
    id: string,
    category: Partial<CategoryEntity>,
  ): Promise<CategoryEntity>;
  delete(id: string): Promise<void>;
}
