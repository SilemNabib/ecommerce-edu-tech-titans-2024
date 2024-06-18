import OrderSummary from "../../Components/OrderSummary";
import ProgressBar from "../../Components/ProgressBar";

const registerSteps = [
    <a href={"/checkout/cart"}>Cart</a>,
    <a href={"/checkout/profile"}>Personal Information</a>,
    <a href={"/checkout/shipping"}>Shipping</a>,
    <a href={"/checkout/payment"}>Payment</a>,
];

const CheckoutCart = () => {
  return (
    <div className="flex flex-col justify-center">
    <ProgressBar steps={registerSteps} currentStep={0} title="Checkout progress" />
      <div className="md:w-2/6">
        {/* Añadir el carrito acá*/}
      </div>
      <div className="mr-6 md:flex md:justify-end">
        <OrderSummary />
      </div>
    </div>
  );
};

export default CheckoutCart;
