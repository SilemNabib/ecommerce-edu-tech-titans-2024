import { CurrencyDollarIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import OrderData from '../../config/OrderData';

const OrderStatusCard = ({ order }) => {

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">Date: {order.creationDate.split("T")[0]}</p>
          <p className="text-lg font-semibold">Status: {order.orderStatus}</p>
        </div>
        <div className="flex items-center text-green-600">
          <CurrencyDollarIcon className="h-5 w-5 mr-1" />
          <span className="text-xl font-bold">{order.totalPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderStatusCard;