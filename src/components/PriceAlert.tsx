import React, { useState } from 'react';
import { Product } from '../types';
import { createPriceAlert } from '../services/api';

interface PriceAlertProps {
  product: Product;
}

const PriceAlert: React.FC<PriceAlertProps> = ({ product }) => {
  const [email, setEmail] = useState('');
  const [targetPrice, setTargetPrice] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPriceAlert(product.id, Number(targetPrice), email);
      setIsSuccess(true);
      setEmail('');
      setTargetPrice('');
    } catch (error) {
      console.error('Erreur lors de la création de l\'alerte:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-bold mb-4">Créer une alerte de prix</h3>
      {isSuccess ? (
        <div className="text-green-600 mb-4">
          Alerte créée avec succès ! Vous serez notifié par email.
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Prix cible (€)
            </label>
            <input
              type="number"
              value={targetPrice}
              onChange={(e) => setTargetPrice(e.target.value)}
              className="w-full p-2 border rounded"
              required
              min="0"
              step="0.01"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Créer l'alerte
          </button>
        </form>
      )}
    </div>
  );
};

export default PriceAlert;