import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartData } from '../../config/CartData';

function Cart() {
  const [carts, setCarts] = useState(CartData.items);
  const [total, setTotal] = useState(CartData.total);

  useEffect(() => {
    updateTotal();
  }, [carts]);

  const handleInc = (id) => {
    setCarts(carts.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const handleDec = (id) => {
    setCarts(carts.map(item => 
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  const removeProduct = (id) => {
    setCarts(carts.filter(item => item.id !== id));
  };

  const updateTotal = () => {
    const newTotal = carts.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(newTotal);
  };

  if (carts.length === 0) {
    return <h1 className="h-[55vh] flex justify-center items-center text-4xl">Cart is Empty</h1>;
  }

  return (
    <div className="container mx-auto mt-10">
      <div className="w-3/4 shadow-md my-10 flex-wrap">
        <div className="bg-white px-10 py-1">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            <h2 className="font-semibold text-2xl">{carts.length} Items</h2>
          </div>
          <div className="flex flex-wrap mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Quantity</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Price</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Total</h3>
          </div>
          {carts.map(cart => (
            <div key={cart.id} className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
              <div className="flex w-2/5">
                <div className="w-20">
                  <img className="h-24" src={cart.image} alt={cart.title} />
                </div>
                <div className="flex flex-col justify-between ml-4 flex-grow">
                  <span className="font-bold text-sm">{cart.title}</span>
                  <span className="text-red-500 text-xs capitalize">{cart.category}</span>
                  <div
                    className="font-semibold hover:text-red-500 text-gray-500 text-xs cursor-pointer"
                    onClick={() => removeProduct(cart.id)}
                  >
                    Remove
                  </div>
                </div>
              </div>
              <div className="flex justify-center w-1/5">
                <svg
                  className="fill-current text-gray-600 w-3 cursor-pointer"
                  viewBox="0 0 448 512"
                  onClick={() => handleDec(cart.id)}
                >
                  <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                </svg>
                <input className="mx-2 border text-center w-8" type="text" value={cart.quantity} readOnly />
                <svg
                  className="fill-current text-gray-600 w-3 cursor-pointer"
                  viewBox="0 0 448 512"
                  onClick={() => handleInc(cart.id)}
                >
                  <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                </svg>
              </div>
              <span className="text-center w-1/5 font-semibold text-sm">${cart.price.toFixed(2)}</span>
              <span className="text-center w-1/5 font-semibold text-sm">
                ${(cart.price * cart.quantity).toFixed(2)}
              </span>
            </div>
          ))}
          <Link to="/" className="flex font-semibold text-gray-900 text-sm mt-10">
            <svg className="fill-current mr-2 text-gray-900 w-4" viewBox="0 0 448 512">
              <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
            </svg>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;