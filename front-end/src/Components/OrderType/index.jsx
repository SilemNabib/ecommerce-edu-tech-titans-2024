import OrderStatusCard from '../OrderStatusCard';

/**
 * Renders a component that displays a list of orders with a specified title.
 *
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the order type.
 * @param {Array} props.orders - The list of orders to be displayed.
 * @returns {JSX.Element} The rendered OrderType component.
 */
const OrderType = ({ title, orders }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 w-full">
      <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>
      <div className="orders-list flex flex-col space-y-4">
        {orders.map((order, index) => (
          <OrderStatusCard key={index} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrderType;