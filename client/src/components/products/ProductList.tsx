import { useEffect } from 'react';
import { useProductStore } from '../../stores/product.store';
import { ProductCard } from './ProductCard';

export const ProductList = () => {
  const { products, categories, selectedCategory, isLoading, fetchProducts, fetchCategories, setSelectedCategory } = useProductStore();

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [fetchCategories, fetchProducts]);

  useEffect(() => {
    fetchProducts(selectedCategory || undefined);
  }, [selectedCategory, fetchProducts]);

  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-neutral-500 text-lg">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryChange(category.id)}
            className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${
              selectedCategory === category.id
                ? 'bg-primary-600 text-white shadow-sm'
                : 'bg-white text-neutral-700 border border-neutral-300 hover:border-primary-300 hover:text-primary-600'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {products.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-neutral-500 text-lg">No products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
