import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const lowestPrice = Math.min(...product.offers.map(offer => offer.totalPrice));
  const offerCount = product.offers.length;

  return (
    <Link to={`/product/${product.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 mb-4">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover object-center"
          />
        </div>
        <h3 className="text-lg font-medium text-gray-900 truncate">{product.name}</h3>
        <div className="mt-2">
          <p className="text-sm text-gray-500">À partir de</p>
          <p className="text-xl font-bold text-blue-600">{lowestPrice.toFixed(2)} €</p>
          <p className="text-sm text-gray-600">{offerCount} offres disponibles</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;