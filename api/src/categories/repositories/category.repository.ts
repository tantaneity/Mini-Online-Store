import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { ICategoryRepository } from '../interfaces/category-repository.interface';

@Injectable()
export class CategoryRepository implements ICategoryRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly repository: Repository<CategoryEntity>,
  ) {}

  async findById(id: string): Promise<CategoryEntity | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findAll(): Promise<CategoryEntity[]> {
    return this.repository.find({ where: { isActive: true } });
  }

  async create(category: Partial<CategoryEntity>): Promise<CategoryEntity> {
    const newCategory = this.repository.create(category);
    return this.repository.save(newCategory);
  }

  async update(
    id: string,
    category: Partial<CategoryEntity>,
  ): Promise<CategoryEntity> {
    await this.repository.update(id, category);
    const updated = await this.findById(id);
    if (!updated) {
      throw new Error('Category not found');
    }
    return updated;
  }

  async delete(id: string): Promise<void> {
    await this.repository.update(id, { isActive: false });
  }
}
