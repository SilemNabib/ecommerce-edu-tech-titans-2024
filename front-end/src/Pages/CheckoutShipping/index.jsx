import OrderSummary from "../../Components/OrderSummary";
import ProgressBar from "../../Components/ProgressBar";
import ShippingInfo from "../../Components/ShippingInfo";

const registerSteps = [
  "Select destination",
  "New address",
  "Summary",
  "Payment",
];

const CheckoutShipping = () => {
    return (
      <div className="flex flex-col items-center">
        <ProgressBar steps={registerSteps} currentStep={1} title="Checkout progress" />
        <div className="flex flex-col md:flex-row justify-around items-center mt-10 w-full">
          <div className="md:w-3/5 mb-4 md:mb-0 p-4">
            <ShippingInfo />
          </div>
        </div>
      </div>
    );
  };

export default CheckoutShipping;