import React from 'react';

interface FilterSidebarProps {
  filters: {
    condition: string[];
    minPrice: string;
    maxPrice: string;
    stores: string[];
  };
  onFilterChange: (filters: any) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onFilterChange }) => {
  const conditions = [
    { id: 'new', label: 'Neuf' },
    { id: 'used', label: 'Occasion' },
    { id: 'refurbished', label: 'Reconditionné' }
  ];

  const stores = [
    { id: 'amazon', label: 'Amazon' },
    { id: 'fnac', label: 'Fnac' },
    { id: 'cdiscount', label: 'Cdiscount' },
    { id: 'aliexpress', label: 'AliExpress' },
    { id: 'temu', label: 'Temu' }
  ];

  const handleConditionChange = (condition: string) => {
    const newConditions = filters.condition.includes(condition)
      ? filters.condition.filter(c => c !== condition)
      : [...filters.condition, condition];
    onFilterChange({ ...filters, condition: newConditions });
  };

  const handleStoreChange = (store: string) => {
    const newStores = filters.stores.includes(store)
      ? filters.stores.filter(s => s !== store)
      : [...filters.stores, store];
    onFilterChange({ ...filters, stores: newStores });
  };

  return (
    <div className="w-64 bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-bold mb-4">Filtres</h2>
      
      <div className="mb-6">
        <h3 className="font-semibold mb-2">État</h3>
        {conditions.map(({ id, label }) => (
          <label key={id} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={filters.condition.includes(id)}
              onChange={() => handleConditionChange(id)}
              className="mr-2"
            />
            {label}
          </label>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Prix</h3>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => onFilterChange({ ...filters, minPrice: e.target.value })}
            className="w-1/2 p-1 border rounded"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => onFilterChange({ ...filters, maxPrice: e.target.value })}
            className="w-1/2 p-1 border rounded"
          />
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Boutiques</h3>
        {stores.map(({ id, label }) => (
          <label key={id} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={filters.stores.includes(id)}
              onChange={() => handleStoreChange(id)}
              className="mr-2"
            />
            {label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterSidebar;