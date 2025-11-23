import { useState } from 'react';
import type { FormEvent } from 'react';
import { useCartStore } from '../../stores/cart.store';
import { useOrderStore } from '../../stores/order.store';
import { useNavigate } from 'react-router-dom';
import type { CreateOrderDto } from '../../types/order.types';

export const Checkout = () => {
  const { items, clearCart, getTotalPrice } = useCartStore();
  const { createOrder, isLoading } = useOrderStore();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const orderData: CreateOrderDto = {
      shippingAddress,
      items: items.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      })),
    };

    try {
      await createOrder(orderData);
      clearCart();
      navigate('/orders');
    } catch (error) {
      console.error('Failed to create order', error);
    }
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-neutral-900 mb-8">Checkout</h2>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="card p-6">
          <h3 className="text-xl font-semibold text-neutral-900 mb-4">Order Summary</h3>
          <div className="space-y-3 mb-4">
            {items.map((item) => (
              <div key={item.product.id} className="flex justify-between items-center py-2 border-b border-neutral-100">
                <div className="flex-1">
                  <p className="font-medium text-neutral-900">{item.product.name}</p>
                  <p className="text-sm text-neutral-600">Quantity: {item.quantity}</p>
                </div>
                <span className="font-semibold text-neutral-900">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center pt-4 border-t-2 border-neutral-200">
            <strong className="text-lg text-neutral-900">Total:</strong>
            <strong className="text-2xl text-primary-600">${getTotalPrice().toFixed(2)}</strong>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="card p-6">
          <h3 className="text-xl font-semibold text-neutral-900 mb-4">Shipping Information</h3>
          <div className="mb-6">
            <label htmlFor="shippingAddress" className="block text-sm font-medium text-neutral-700 mb-2">
              Shipping Address
            </label>
            <textarea
              id="shippingAddress"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              required
              rows={5}
              placeholder="Enter your full shipping address&#10;Street, City, State, ZIP"
              className="input-field resize-none"
            />
          </div>

          <button type="submit" disabled={isLoading} className="w-full btn-primary text-lg py-3">
            {isLoading ? 'Processing...' : 'Place Order'}
          </button>
        </form>
      </div>
    </div>
  );
};
