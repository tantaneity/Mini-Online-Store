import { useEffect } from 'react';
import { useOrderStore } from '../../stores/order.store';
import { Link } from 'react-router-dom';
import { OrderStatus } from '../../types/order.types';

export const OrderList = () => {
  const { orders, isLoading, fetchMyOrders } = useOrderStore();

  useEffect(() => {
    fetchMyOrders();
  }, [fetchMyOrders]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-neutral-500 text-lg">Loading orders...</div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="card p-12">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">No orders yet</h2>
          <p className="text-neutral-600 mb-8">Start shopping to create your first order</p>
          <Link to="/products" className="btn-primary inline-block">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const baseClass = 'px-3 py-1 rounded-full text-xs font-semibold';
    switch (status) {
      case OrderStatus.DELIVERED:
        return `${baseClass} bg-green-100 text-green-800`;
      case OrderStatus.CANCELLED:
        return `${baseClass} bg-red-100 text-red-800`;
      case OrderStatus.PROCESSING:
        return `${baseClass} bg-blue-100 text-blue-800`;
      case OrderStatus.SHIPPED:
        return `${baseClass} bg-purple-100 text-purple-800`;
      default:
        return `${baseClass} bg-neutral-100 text-neutral-800`;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-neutral-900 mb-8">My Orders</h2>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="card p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 pb-4 border-b border-neutral-200">
              <span className="text-sm font-semibold text-neutral-900 mb-2 sm:mb-0">
                Order #{order.id.substring(0, 8).toUpperCase()}
              </span>
              <span className={getStatusBadge(order.status)}>
                {order.status}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
              <div>
                <p className="text-neutral-500 mb-1">Date</p>
                <p className="font-medium text-neutral-900">{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-neutral-500 mb-1">Total</p>
                <p className="font-bold text-primary-600">${Number(order.totalAmount).toFixed(2)}</p>
              </div>
              <div>
                <p className="text-neutral-500 mb-1">Items</p>
                <p className="font-medium text-neutral-900">{order.items.length}</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm py-2 border-t border-neutral-100">
                  <span className="text-neutral-900">{item.product?.name || 'Product'}</span>
                  <span className="text-neutral-600">×{item.quantity}</span>
                  <span className="font-medium text-neutral-900">${Number(item.price).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="bg-neutral-50 p-4 rounded-lg space-y-2 text-sm">
              <p className="text-neutral-700">
                <span className="font-semibold">Shipping to:</span> {order.shippingAddress}
              </p>
              {order.trackingNumber && (
                <p className="text-neutral-700">
                  <span className="font-semibold">Tracking:</span> {order.trackingNumber}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
