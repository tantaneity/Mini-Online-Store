import type { Product } from '../../types/product.types';
import { useCartStore } from '../../stores/cart.store';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(product, 1);
  };

  return (
    <div className="card overflow-hidden flex flex-col h-full">
      {product.imageUrl && (
        <div className="aspect-square overflow-hidden bg-neutral-100">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-neutral-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm text-neutral-600 mb-4 line-clamp-3 flex-1">
          {product.description}
        </p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-primary-600">
            ${Number(product.price).toFixed(2)}
          </span>
          <span className={`text-sm font-medium ${
            product.stock > 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {product.stock > 0 ? `Stock: ${product.stock}` : 'Out of stock'}
          </span>
        </div>
        <div className="flex gap-2">
          <Link 
            to={`/products/${product.id}`} 
            className="flex-1 px-4 py-2.5 text-center border border-neutral-300 text-neutral-700 rounded-lg font-medium hover:bg-neutral-50 transition-colors"
          >
            Details
          </Link>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0 || !product.isAvailable}
            className="flex-1 btn-primary"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
