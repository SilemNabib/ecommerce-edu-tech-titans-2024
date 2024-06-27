import { CurrencyDollarIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import OrderData from '../../config/OrderData';

/**
 * Renders a card displaying the order status information.
 *
 * return (
 *   <OrderStatusCard />
 * )
 */
const OrderStatusCard = () => {
  const [order, setOrder] = useState({ date: '', status: '', total: 0 });

  useEffect(() => {
    // Here would go the logic to fetch the data from the backend
    setOrder(OrderData);
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">Date: {order.date}</p>
          <p className="text-lg font-semibold">Status: {order.status}</p>
        </div>
        <div className="flex items-center text-green-600">
          <CurrencyDollarIcon className="h-5 w-5 mr-1" />
          <span className="text-xl font-bold">{order.total}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderStatusCard;