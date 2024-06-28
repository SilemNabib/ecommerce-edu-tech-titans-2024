import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { ApiConfig } from '../../config/ApiConfig';

/**
 * Renders the order summary component.
 * 
 * @param {Object} props - The component props.
 * @param {string} props.text - The text to display on the button.
 * @param {string} props.to - The URL to navigate to when the button is clicked.
 * @returns {JSX.Element} The rendered OrderSummary component.
 */
const OrderSummary = ({ text, to }) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState(null);
  const [subtotal, setSubtotal] = useState(null);
  const shipping = 0;
  
  const setData = (response) => {
    if (response.status === 200) {
      const items = response.data.data;
      if(!items || items.length === 0) navigate('/');
      setProducts(items);
      setSubtotal(items.reduce((acc, item) => acc + item.inventory.product.price * item.cartStock, 0));
      sessionStorage.setItem('cart', JSON.stringify(items));
    }
  }

  const getCart = async () => {
    const response = await auth.authFetch(ApiConfig.cart.get)
    setData(response);
  }

  useEffect(() => {
    getCart();
  }, []);

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
          <span>{subtotal + shipping}</span>
        </div>
      </div>

      {text &&
        (
          <button onClick={()=>navigate(to)} className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors duration-300">
          {text}
          </button>
        )
      }

      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Products in your order</h3>
        {products?.map((product, index) => (
          <div
            key={index}
            className="flex items-center bg-gray-100 p-4 rounded-md"
          >
            <img
              src={product.inventory.product.productImages[0].url}
              alt={product.inventory.product.name}
              className="w-16 h-16 object-cover rounded-md mr-4"
            />
            <div>
              <p className="font-medium">{product.inventory.product.name}</p>
              <p>{product.inventory.product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderSummary;
