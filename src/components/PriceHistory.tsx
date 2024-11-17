import React from 'react';
import { useQuery } from 'react-query';
import { getPriceHistory } from '../services/api';
import { Line } from 'react-chartjs-2';

interface PriceHistoryProps {
  productId: string;
}

const PriceHistory: React.FC<PriceHistoryProps> = ({ productId }) => {
  const { data: history, isLoading } = useQuery(
    ['priceHistory', productId],
    () => getPriceHistory(productId)
  );

  if (isLoading || !history) {
    return <div>Chargement de l'historique...</div>;
  }

  const chartData = {
    labels: history.map(point => new Date(point.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Prix',
        data: history.map(point => point.price),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <Line data={chartData} options={{ responsive: true }} />
    </div>
  );
};

export default PriceHistory;