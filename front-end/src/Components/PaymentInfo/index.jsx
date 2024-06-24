import { useEffect, useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { ApiConfig } from '../../config/ApiConfig';
import { CircularProgress } from '@mui/material';

const PaymentInfo = () => {
  const [orderStatus, setOrderStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const auth = useAuth();

  useEffect(() => {
    // Aquí agregar lógica para manejar el estado inicial, si es necesario
  }, []);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await auth.authFetch(ApiConfig.checkout.paypal, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ /* Aquí puedes agregar los datos necesarios para la orden */ }),
      });

      if (response.ok) {
        const data = await response.json();
        window.location.href = data.data.approveUrl; // Redirige a PayPal
      } else {
        console.error("Failed to create PayPal order", response.statusText);
      }
    } catch (error) {
      console.error("Error creating PayPal order", error);
    } finally {
      setLoading(false);
    }
  };

  const checkOrderStatus = async (orderId) => {
    setLoading(true);
    try {
      const response = await auth.authFetch(`${ApiConfig.checkout.status}?order=${orderId}`);
      const data = await response.json();
      setOrderStatus(data);
    } catch (error) {
      console.error("Error fetching order status", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-8">
      <h2 className="text-xl font-bold mb-4">Payment Information</h2>
      {loading && <CircularProgress/>}
      {!loading && (
        <div>
          {orderStatus ? (
            <div>
              <h3 className="text-lg font-bold mb-2">Order Status</h3>
              <p>Status: {orderStatus.status}</p>
              <p>Platform Status: {orderStatus.platformStatus}</p>
              <p>Order ID: {orderStatus.orderId}</p>
              <p>Payment ID: {orderStatus.paymentId}</p>
            </div>
          ) : (
            <div className="mt-4">
              <div className="mb-4">
                <div className="flex items-center">
                  <input
                    id="isAgeConfirmed"
                    type="checkbox"
                    checked={isAgeConfirmed}
                    onChange={handleCheckboxChange}
                    required
                    className="form-checkbox h-5 w-5 text-black"
                  />
                  <label htmlFor="isAgeConfirmed" className="ml-2 block text-sm leading-5 text-gray-900">
                    I declare that I am of legal age to purchase from Sunflowers.
                  </label>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex items-center">
                  <input
                    id="isTermsAccepted"
                    type="checkbox"
                    checked={isTermsAccepted}
                    onChange={handleCheckboxChange}
                    required
                    className="form-checkbox h-5 w-5 text-black"
                  />
                  <label htmlFor="isTermsAccepted" className="ml-2 block text-sm leading-5 text-gray-900">
                    I accept the data processing and privacy policy of Sunflowers Inc. <a href="#" className="text-gray-600 hover:text-gray-900">View more</a>.
                  </label>
                </div>
              </div>
              <button onClick={handleCheckout} className="bg-black hover:font-bold text-white py-2 px-4 rounded">
                Pay with PayPal
              </button>
            </div>
            
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentInfo;
