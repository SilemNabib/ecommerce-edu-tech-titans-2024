import { CircularProgress } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '../../Context/AuthContext';
import { ApiConfig } from '../../config/ApiConfig';

/**
 * PaymentInfo component displays the payment information form and handles the checkout process.
 *
 * return (
 *   <PaymentInfo />
 * )
 */
const PaymentInfo = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({ isAgeConfirmed: false, isTermsAccepted: false });

  const handleCheckout = async () => {
    setLoading(true);
    

    if (!isAgeConfirmed || !isTermsAccepted) {
      toast.error("You must accept the terms and conditions to continue.");
      setLoading(false);
      return;
    }

    if(!localStorage.getItem("selectedAddress") || localStorage.getItem("selectedAddress") === "" || localStorage.getItem("selectedAddress") === null) {
      toast.error("You must select an address to continue.");
      setLoading(false);
      navigate("/checkout/address");
      return;
    }
    
    try {
      const response = await auth.authFetch(ApiConfig.checkout.paypal, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          "addressId": localStorage.getItem("selectedAddress"),
        }),
      });

      if (response.status === 200) {
        const data = await response.data.data;
        localStorage.removeItem("selectedAddress");
        localStorage.setItem("orderId", data.id);
        window.location.href = data.links[1].href;
      } else {
        toast.error("Failed to create PayPal order", response.statusText);
        navigate("/");
      }
    } catch (error) {
      console.log(error)
      toast.error("Error creating PayPal order", error);
    } finally {
      setLoading(false);
    }
  };

    const handleCheckboxChange = (e) => {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    };


  const { isAgeConfirmed, isTermsAccepted } = formData;

  return (
    <div className="bg-white shadow-md rounded-lg p-8">
      <ToastContainer />
      <h2 className="text-xl font-bold mb-4">Payment Information</h2>
        <div>
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
          {loading && <CircularProgress className="m-4" />}
        </div>
    </div>
  );
};

export default PaymentInfo;
