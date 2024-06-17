import OrderSummary from "../../Components/OrderSummary";

const CheckoutCart = () => {
  return (
    <div className="md:flex md:justify-end">
      <div className="md:w-2/6">
        {/* Añadir el carrito acá*/}
      </div>
      <div className="md:w-2/6 mx-auto m-4">
        <OrderSummary />
      </div>
    </div>
  );
};

export default CheckoutCart;
