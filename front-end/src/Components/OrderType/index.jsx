import OrderStatusCard from '../OrderStatusCard';

const OrderType = ({ title, orders }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 w-full min-w-60 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>
      <div className="orders-list flex flex-col space-y-4">
        {orders?.map((order, index) => (
          <OrderStatusCard key={index} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrderType;