import React from 'react';
import ProductList from '../components/ProductList';

const HomePage: React.FC = () => {
  // Simuler des données de produits pour la démonstration
  const featuredProducts = [
    {
      id: '1',
      name: 'iPhone 15 Pro',
      description: 'Le dernier iPhone avec puce A17 Pro',
      image: 'https://example.com/iphone15.jpg',
      category: 'Smartphones',
      offers: [
        {
          id: '1',
          store: 'Amazon',
          price: 1199,
          condition: 'new' as const,
          shipping: 0,
          totalPrice: 1199,
          url: 'https://amazon.fr',
          availability: true
        },
        {
          id: '2',
          store: 'Fnac',
          price: 1229,
          condition: 'new' as const,
          shipping: 0,
          totalPrice: 1229,
          url: 'https://fnac.com',
          availability: true
        }
      ]
    }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Meilleures offres du moment</h1>
      <ProductList products={featuredProducts} />
    </div>
  );
};

export default HomePage;