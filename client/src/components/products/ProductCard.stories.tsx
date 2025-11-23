import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { ProductCard } from './ProductCard';
import type { Product } from '../../types/product.types';

const meta = {
  title: 'Components/ProductCard',
  component: ProductCard,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div style={{ width: '320px' }}>
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    product: {
      description: 'Product object containing all product information',
    },
  },
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseProduct: Product = {
  id: '1',
  name: 'Wireless Bluetooth Headphones',
  description: 'Premium noise-cancelling headphones with 30-hour battery life and crystal-clear audio quality.',
  price: 129.99,
  stock: 15,
  imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
  isAvailable: true,
  categoryId: 'electronics',
  createdAt: '2024-01-15T00:00:00.000Z',
  updatedAt: '2024-11-20T00:00:00.000Z',
};

export const Default: Story = {
  args: {
    product: baseProduct,
  },
};

export const OutOfStock: Story = {
  args: {
    product: {
      ...baseProduct,
      stock: 0,
      name: 'Sold Out Product',
      description: 'This amazing product is currently out of stock. Check back soon!',
    },
  },
};

export const LowStock: Story = {
  args: {
    product: {
      ...baseProduct,
      stock: 3,
      name: 'Limited Edition Smartwatch',
      description: 'Last few units! Get it before it\'s gone. Features heart rate monitor, GPS, and water resistance.',
      price: 299.99,
      imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    },
  },
};

export const HighPriceItem: Story = {
  args: {
    product: {
      ...baseProduct,
      name: 'Professional DSLR Camera',
      description: 'Full-frame mirrorless camera with 45MP sensor, 8K video recording, and weather-sealed body for professional photography.',
      price: 2499.99,
      stock: 5,
      imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&h=500&fit=crop',
    },
  },
};

export const LongDescription: Story = {
  args: {
    product: {
      ...baseProduct,
      name: 'Ultra-Premium Gaming Laptop with Extended Features',
      description: 'Top-of-the-line gaming laptop featuring the latest RTX 4090 graphics card, Intel i9-14900K processor, 64GB DDR5 RAM, 2TB NVMe SSD storage, 17.3-inch 4K display with 144Hz refresh rate, RGB mechanical keyboard, and advanced cooling system for maximum performance.',
      price: 3499.99,
      stock: 2,
      imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&h=500&fit=crop',
    },
  },
};

export const NoImage: Story = {
  args: {
    product: {
      ...baseProduct,
      imageUrl: '',
      name: 'Product Without Image',
      description: 'This product doesn\'t have an image yet, but it\'s still a great buy!',
    },
  },
};
