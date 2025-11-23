import { create } from 'zustand';
import { orderApi } from '../api/order.api';
import type { Order, CreateOrderDto } from '../types/order.types';
import { handleStoreError } from '../utils/error-handler';

interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  isLoading: boolean;
  error: string | null;
  fetchMyOrders: () => Promise<void>;
  fetchAllOrders: () => Promise<void>;
  fetchOrderById: (id: string) => Promise<void>;
  createOrder: (data: CreateOrderDto) => Promise<Order>;
  clearError: () => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  orders: [],
  currentOrder: null,
  isLoading: false,
  error: null,

  fetchMyOrders: async () => {
    try {
      set({ isLoading: true, error: null });
      const orders = await orderApi.getMyOrders();
      set({ orders, isLoading: false });
    } catch (error) {
      handleStoreError(set, error, 'Failed to fetch orders');
    }
  },

  fetchAllOrders: async () => {
    try {
      set({ isLoading: true, error: null });
      const orders = await orderApi.getAll();
      set({ orders, isLoading: false });
    } catch (error) {
      handleStoreError(set, error, 'Failed to fetch orders');
    }
  },

  fetchOrderById: async (id) => {
    try {
      set({ isLoading: true, error: null });
      const order = await orderApi.getById(id);
      set({ currentOrder: order, isLoading: false });
    } catch (error) {
      handleStoreError(set, error, 'Failed to fetch order');
    }
  },

  createOrder: async (data) => {
    try {
      set({ isLoading: true, error: null });
      const order = await orderApi.create(data);
      set({ currentOrder: order, isLoading: false });
      return order;
    } catch (error) {
      handleStoreError(set, error, 'Failed to create order');
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));
