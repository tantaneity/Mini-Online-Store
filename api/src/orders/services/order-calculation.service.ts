import { Injectable } from '@nestjs/common';
import { ProductEntity } from '../../products/entities/product.entity';
import { CreateOrderItemDto } from '../dto/create-order-item.dto';

@Injectable()
export class OrderCalculationService {
  calculateTotalAmount(
    items: CreateOrderItemDto[],
    products: ProductEntity[],
  ): number {
    return items.reduce((total, item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) return total;
      return total + Number(product.price) * item.quantity;
    }, 0);
  }

  prepareOrderItems(items: CreateOrderItemDto[], products: ProductEntity[]) {
    return items.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) {
        throw new Error(`Product ${item.productId} not found`);
      }
      return {
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
      };
    });
  }
}
