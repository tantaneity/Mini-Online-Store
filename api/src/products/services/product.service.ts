import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ProductRepository } from '../repositories/product.repository';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductEntity } from '../entities/product.entity';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async findById(id: string): Promise<ProductEntity> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async findAll(categoryId?: string): Promise<ProductEntity[]> {
    return this.productRepository.findAll(categoryId);
  }

  async createProduct(createDto: CreateProductDto): Promise<ProductEntity> {
    return this.productRepository.create(createDto);
  }

  async updateProduct(
    id: string,
    updateDto: UpdateProductDto,
  ): Promise<ProductEntity> {
    await this.findById(id);
    return this.productRepository.update(id, updateDto);
  }

  async deleteProduct(id: string): Promise<void> {
    await this.findById(id);
    await this.productRepository.delete(id);
  }

  async checkStockAvailability(
    productId: string,
    quantity: number,
  ): Promise<void> {
    const product = await this.findById(productId);

    if (!product.isAvailable) {
      throw new BadRequestException('Product is not available');
    }

    if (product.stock < quantity) {
      throw new BadRequestException('Insufficient stock');
    }
  }

  async decreaseStock(productId: string, quantity: number): Promise<void> {
    await this.productRepository.decreaseStock(productId, quantity);
  }
}
