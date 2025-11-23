import { create } from 'zustand';
import { productApi, categoryApi } from '../api/product.api';
import type { Product, Category } from '../types/product.types';
import { handleStoreError } from '../utils/error-handler';

interface ProductState {
  products: Product[];
  categories: Category[];
  selectedProduct: Product | null;
  selectedCategory: string | null;
  isLoading: boolean;
  error: string | null;
  fetchProducts: (categoryId?: string) => Promise<void>;
  fetchProductById: (id: string) => Promise<void>;
  fetchCategories: () => Promise<void>;
  setSelectedCategory: (categoryId: string | null) => void;
  clearError: () => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  categories: [],
  selectedProduct: null,
  selectedCategory: null,
  isLoading: false,
  error: null,

  fetchProducts: async (categoryId) => {
    try {
      set({ isLoading: true, error: null });
      const products = await productApi.getAll(categoryId);
      set({ products, isLoading: false });
    } catch (error) {
      handleStoreError(set, error, 'Failed to fetch products');
    }
  },

  fetchProductById: async (id) => {
    try {
      set({ isLoading: true, error: null });
      const product = await productApi.getById(id);
      set({ selectedProduct: product, isLoading: false });
    } catch (error) {
      handleStoreError(set, error, 'Failed to fetch product');
    }
  },

  fetchCategories: async () => {
    try {
      const categories = await categoryApi.getAll();
      set({ categories });
    } catch (error) {
      handleStoreError(set, error, 'Failed to fetch categories');
    }
  },

  setSelectedCategory: (categoryId) => {
    set({ selectedCategory: categoryId });
  },

  clearError: () => set({ error: null }),
}));
