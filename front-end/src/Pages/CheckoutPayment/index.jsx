import OrderSummary from "../../Components/OrderSummary";
import PaymentInfo from "../../Components/PaymentInfo";
import ProgressBar from "../../Components/ProgressBar";

const registerSteps = [
    <a href={"/checkout/cart"}>Cart</a>,
    <a href={"/checkout/profile"}>Personal Information</a>,
    <a href={"/checkout/shipping"}>Shipping</a>,
    <a href={"/checkout/payment"}>Payment</a>,
];

const CheckoutPayment = () => {
    return (
      <div className="flex flex-col items-center">
        <ProgressBar steps={registerSteps} currentStep={3} title="Checkout progress" />
        <div className="flex flex-col md:flex-row justify-center md:justify-between mt-10">
          <div className="md:w-3/5 mb-4 md:mb-0 mt-4 lg:mt-20">
            <PaymentInfo />
          </div>
          <div className="md:w-2/6">
            <OrderSummary />
          </div>
        </div>
      </div>
    );
  };

export default CheckoutPayment;