import React from 'react';
import { Link } from 'react-router-dom';

interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories: {
    id: string;
    name: string;
  }[];
}

const categories: Category[] = [
  {
    id: 'electronics',
    name: 'Électronique',
    icon: '📱',
    subcategories: [
      { id: 'smartphones', name: 'Smartphones' },
      { id: 'laptops', name: 'Ordinateurs portables' },
      { id: 'tablets', name: 'Tablettes' },
      { id: 'accessories', name: 'Accessoires' }
    ]
  },
  {
    id: 'home',
    name: 'Maison',
    icon: '🏠',
    subcategories: [
      { id: 'furniture', name: 'Meubles' },
      { id: 'appliances', name: 'Électroménager' },
      { id: 'decoration', name: 'Décoration' }
    ]
  },
  {
    id: 'fashion',
    name: 'Mode',
    icon: '👕',
    subcategories: [
      { id: 'clothing', name: 'Vêtements' },
      { id: 'shoes', name: 'Chaussures' },
      { id: 'accessories', name: 'Accessoires' }
    ]
  },
  {
    id: 'sports',
    name: 'Sport & Loisirs',
    icon: '⚽',
    subcategories: [
      { id: 'equipment', name: 'Équipement sportif' },
      { id: 'clothing', name: 'Vêtements de sport' },
      { id: 'outdoor', name: 'Plein air' }
    ]
  }
];

const CategoriesPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Catégories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-2">{category.icon}</span>
              <h2 className="text-xl font-bold">{category.name}</h2>
            </div>
            <ul className="space-y-2">
              {category.subcategories.map((sub) => (
                <li key={sub.id}>
                  <Link
                    to={`/search?category=${category.id}&subcategory=${sub.id}`}
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {sub.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;