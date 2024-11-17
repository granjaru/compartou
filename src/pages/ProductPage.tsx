import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getProductDetails } from '../services/api';
import PriceHistory from '../components/PriceHistory';
import OfferList from '../components/OfferList';
import PriceAlert from '../components/PriceAlert';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useQuery(
    ['product', id],
    () => getProductDetails(id!),
    { enabled: !!id }
  );

  if (isLoading || !product) {
    return <div className="flex justify-center p-8">Chargement...</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow-md p-6">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto rounded-lg mb-4"
          />
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
        </div>
        
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Historique des prix</h2>
          <PriceHistory productId={product.id} />
        </div>
      </div>

      <div className="lg:col-span-1">
        <PriceAlert product={product} />
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Toutes les offres</h2>
          <OfferList offers={product.offers} />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;