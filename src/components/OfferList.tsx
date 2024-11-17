import React from 'react';
import { Offer } from '../types';

interface OfferListProps {
  offers: Offer[];
}

const OfferList: React.FC<OfferListProps> = ({ offers }) => {
  const sortedOffers = [...offers].sort((a, b) => a.totalPrice - b.totalPrice);

  return (
    <div className="space-y-4">
      {sortedOffers.map((offer) => (
        <div
          key={offer.id}
          className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">{offer.store}</span>
            <span className="text-sm text-gray-500">
              {offer.condition === 'new' ? 'Neuf' :
               offer.condition === 'used' ? 'Occasion' : 'Reconditionné'}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xl font-bold text-blue-600">
              {offer.price.toFixed(2)} €
            </span>
            <span className="text-sm text-gray-500">
              + {offer.shipping.toFixed(2)} € livraison
            </span>
          </div>
          <div className="text-lg font-semibold text-gray-700 mb-3">
            Total: {offer.totalPrice.toFixed(2)} €
          </div>
          <a
            href={offer.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded hover:bg-blue-700"
          >
            Voir l'offre
          </a>
        </div>
      ))}
    </div>
  );
};

export default OfferList;