import ProgressBar from "../../Components/ProgressBar";
import ShippingInfo from "../../Components/ShippingInfo";

const registerSteps = [
  "Select destination",
  "New address",
  "Summary",
  "Payment",
];

/**
 * Renders the CheckoutShipping component.
 * This component displays the shipping information section of the checkout process.
 *
 * @returns {JSX.Element} The rendered CheckoutShipping component.
 */
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