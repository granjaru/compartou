import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import ProductList from '../components/ProductList';
import FilterSidebar from '../components/FilterSidebar';
import { searchProducts } from '../services/api';

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [filters, setFilters] = useState({
    condition: [] as string[],
    minPrice: '',
    maxPrice: '',
    stores: [] as string[]
  });

  const { data: products, isLoading } = useQuery(
    ['products', query, filters],
    () => searchProducts(query, filters),
    { enabled: !!query }
  );

  if (isLoading) {
    return <div className="flex justify-center p-8">Chargement...</div>;
  }

  return (
    <div className="flex gap-6">
      <FilterSidebar filters={filters} onFilterChange={setFilters} />
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-4">
          Résultats pour "{query}"
        </h1>
        {products && <ProductList products={products} />}
      </div>
    </div>
  );
};

export default SearchPage;