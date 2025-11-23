import { apiClient } from './client';
import type { Order, CreateOrderDto, UpdateOrderDto } from '../types/order.types';

export const orderApi = {
  async getMyOrders(): Promise<Order[]> {
    const response = await apiClient.get<Order[]>('/orders/my');
    return response.data;
  },

  async getAll(): Promise<Order[]> {
    const response = await apiClient.get<Order[]>('/orders');
    return response.data;
  },

  async getById(id: string): Promise<Order> {
    const response = await apiClient.get<Order>(`/orders/${id}`);
    return response.data;
  },

  async create(data: CreateOrderDto): Promise<Order> {
    const response = await apiClient.post<Order>('/orders', data);
    return response.data;
  },

  async update(id: string, data: UpdateOrderDto): Promise<Order> {
    const response = await apiClient.put<Order>(`/orders/${id}`, data);
    return response.data;
  },
};
