import { useCartStore } from '../../stores/cart.store';
import { Link, useNavigate } from 'react-router-dom';

export const Cart = () => {
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice, getTotalItems } = useCartStore();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (items.length > 0) {
      navigate('/checkout');
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="card p-12">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Your cart is empty</h2>
          <p className="text-neutral-600 mb-8">Add some products to get started</p>
          <Link to="/products" className="btn-primary inline-block">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-neutral-900 mb-8">Shopping Cart</h2>

      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <div key={item.product.id} className="card p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              {item.product.imageUrl && (
                <div className="w-full sm:w-24 h-24 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0">
                  <img 
                    src={item.product.imageUrl} 
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                  {item.product.name}
                </h3>
                <p className="text-primary-600 font-bold">
                  ${Number(item.product.price).toFixed(2)}
                </p>
              </div>
              <div className="flex sm:flex-col items-center sm:items-end gap-4">
                <div className="flex items-center gap-3 bg-neutral-100 rounded-lg p-1">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center text-neutral-700 hover:bg-white rounded transition-colors"
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    disabled={item.quantity >= item.product.stock}
                    className="w-8 h-8 flex items-center justify-center text-neutral-700 hover:bg-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    +
                  </button>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-neutral-900">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="text-sm text-red-600 hover:text-red-700 font-medium mt-1"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card p-6">
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-neutral-600">
            <span>Total Items:</span>
            <span className="font-medium">{getTotalItems()}</span>
          </div>
          <div className="flex justify-between text-xl font-bold text-neutral-900 pt-3 border-t border-neutral-200">
            <span>Total:</span>
            <span className="text-primary-600">${getTotalPrice().toFixed(2)}</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={clearCart} className="flex-1 btn-secondary">
            Clear Cart
          </button>
          <button onClick={handleCheckout} className="flex-1 btn-primary">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};
