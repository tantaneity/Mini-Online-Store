import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CategoryRepository } from '../repositories/category.repository';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CategoryEntity } from '../entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async findById(id: string): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async findAll(): Promise<CategoryEntity[]> {
    return this.categoryRepository.findAll();
  }

  async createCategory(
    createDto: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    return this.categoryRepository.create(createDto);
  }

  async updateCategory(
    id: string,
    updateDto: UpdateCategoryDto,
  ): Promise<CategoryEntity> {
    await this.findById(id);
    return this.categoryRepository.update(id, updateDto);
  }

  async deleteCategory(id: string): Promise<void> {
    await this.findById(id);
    await this.categoryRepository.delete(id);
  }
}
