import OrderSummary from "../../Components/OrderSummary";
import ProgressBar from "../../Components/ProgressBar";
import Cart from "../../Components/Cart";

const registerSteps = [
  <a href={"/checkout/profile"}>Select destination</a>,
  <a href={"/checkout/shipping"}>New address</a>,
  <a href={"/checkout/cart"}>Summary</a>,
  <a href={"/checkout/payment"}>Payment</a>,
];

const CheckoutCart = () => {
  return (
    <div className="flex flex-col justify-center ">
      <ProgressBar steps={registerSteps} currentStep={2} title="Checkout progress" />
      <div className="lg:flex flex-row justify-around">
        <div className="ml-6 md:w-5/6">
          <Cart editable={false}/>
        </div>
        <div className="mr-6 md:flex">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default CheckoutCart;
