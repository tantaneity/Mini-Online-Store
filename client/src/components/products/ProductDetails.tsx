import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductStore } from '../../stores/product.store';
import { useCartStore } from '../../stores/cart.store';

export const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedProduct, isLoading, fetchProductById } = useProductStore();
  const addItem = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      fetchProductById(id);
    }
  }, [id, fetchProductById]);

  const handleAddToCart = () => {
    if (selectedProduct) {
      addItem(selectedProduct, quantity);
      navigate('/cart');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-neutral-500 text-lg">Loading...</div>
      </div>
    );
  }

  if (!selectedProduct) {
    return (
      <div className="text-center py-16">
        <p className="text-red-600 text-lg font-medium">Product not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <button 
        onClick={() => navigate(-1)} 
        className="mb-6 text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2 transition-colors"
      >
        ← Back
      </button>

      <div className="card overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-8">
          {selectedProduct.imageUrl && (
            <div className="aspect-square rounded-xl overflow-hidden bg-neutral-100">
              <img
                src={selectedProduct.imageUrl}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-neutral-900 mb-4">{selectedProduct.name}</h1>
            <p className="text-4xl font-bold text-primary-600 mb-6">${Number(selectedProduct.price).toFixed(2)}</p>
            <p className="text-neutral-600 mb-6 leading-relaxed">{selectedProduct.description}</p>

            <div className="mb-6">
              <span className={`inline-block px-4 py-2 rounded-lg font-medium ${
                selectedProduct.stock > 0
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {selectedProduct.stock > 0
                  ? `In stock: ${selectedProduct.stock} items`
                  : 'Out of stock'}
              </span>
            </div>

            {selectedProduct.stock > 0 && (
              <div className="mt-auto space-y-4">
                <div className="flex items-center gap-4">
                  <label htmlFor="quantity" className="font-medium text-neutral-700">
                    Quantity:
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    min="1"
                    max={selectedProduct.stock}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-24 input-field"
                  />
                </div>
                <button onClick={handleAddToCart} className="w-full btn-primary py-3 text-lg">
                  Add to Cart
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
