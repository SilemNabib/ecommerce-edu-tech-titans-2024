import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import Cart from "../../Components/Cart";
import OrderSummary from "../../Components/OrderSummary";
import ProgressBar from "../../Components/ProgressBar";
import { useAuth } from "../../Context/AuthContext";
import { ApiConfig } from "../../config/ApiConfig";

const registerSteps = [
  "Select destination",
  "New address",
  "Summary",
  "Payment",
];
/**
 * Renders the checkout cart page.
 * 
 * @returns {JSX.Element} The rendered component.
 */
const CheckoutCart = () => {
  const [address, setAddress] = useState(null);
  const auth = useAuth();

  if(!localStorage.getItem('selectedAddress') || localStorage.getItem('selectedAddress') === null){
    window.location.href = "/bootcamp-tech-titans-2024_ecommerce/checkout/address";
  }

  useEffect(() => {
    const getAddress = async () => {
      const response = await auth.authFetch(`${ApiConfig.addresses}/${localStorage.getItem('selectedAddress')}`);

      if(response.status === 200){
        setAddress(response.data);
      } else {
        window.location.href = "/bootcamp-tech-titans-2024_ecommerce/checkout/address";
      }
    }

    getAddress();
  }, []);

  if(!address || address === null){
    return <CircularProgress/>
  }
  

  return (
    <div className="flex flex-col items-center justify-around">
      <ProgressBar steps={registerSteps} currentStep={2} title="Checkout progress" />
      <div className="flex flex-col md:flex-row justify-around items-center mt-10 w-full">
        <div className="md:w-3/5 mb-4 md:mb-0 p-4">
          <div key={address.id} className="border w-full border-gray-300 bg-gray-100 p-4 rounded-md flex flex-row mb-2">
            <div className="ml-6">
              <h3 className="font-semibold">{address.fullName}</h3>
              <div>
                <p>{address.street}</p>
                <p>{`${address.city}, ${address.country.name}`}</p>
                <p>{address.zipCode}</p>
              </div>
            </div>
          </div>
          <Cart editable={false}/>
        </div>
        <div className="md:w-2/6">
          <OrderSummary text={"GO TO PAY"} to={"/checkout/payment"} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutCart;
