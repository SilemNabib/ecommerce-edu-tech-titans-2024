import OrderSummaryData from '../../config/OrderSummaryData';

const OrderSummary = () => {
  const { subtotal, shipping, total, products } = OrderSummaryData;
  return (
    <div className="bg-white p-4 rounded-md shadow-md border border-gray-300 max-w-md mx-auto md:mx-0 md:max-w-full mb-8">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

      <div className="mb-4">
        <label htmlFor="promoCode" className="block font-medium mb-2">
          Enter a promo code
        </label>
        <input
          type="text"
          id="promoCode"
          className="w-full border border-gray-300 rounded-md p-2"
          placeholder="Enter promo code"
        />
      </div>

      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span className="font-medium">Subtotal</span>
          <span>{subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Shipping</span>
            <div>
                <span>{shipping}</span>
                <span className="text-green-700 ml-2 font-bold">FREE</span>
            </div>
        </div>
      </div>

      <div className="border-t border-gray-300 pt-4 mb-4">
        <div className="flex justify-between font-semibold">
          <span>TOTAL</span>
          <span>{total}</span>
        </div>
      </div>

      <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors duration-300">
        PLACE ORDER
      </button>

      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Products in your order</h3>
        {products.map((product, index) => (
          <div
            key={index}
            className="flex items-center bg-gray-100 p-4 rounded-md"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-16 h-16 object-cover rounded-md mr-4"
            />
            <div>
              <p className="font-medium">{product.name}</p>
              <p>{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderSummary;
