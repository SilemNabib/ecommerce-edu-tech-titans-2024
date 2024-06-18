import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputText from '../InputText';

const PaymentInfo = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name: data.name,
        email: data.email,
      },
    });

    if (error) {
      toast.error(error.message);
      setIsLoading(false);
      return;
    }

    // Enviar paymentMethod.id al backend para procesar el pago
    const response = await fetch('/api/process-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ paymentMethodId: paymentMethod.id }),
    });

    const paymentResponse = await response.json();

    if (paymentResponse.error) {
      toast.error(paymentResponse.error);
    } else {
      toast.success('Payment successful!');
    }

    setIsLoading(false);
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md max-w-lg mx-auto mt-8">
      <h2 className="text-lg font-semibold mb-4">Payment Information</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium mb-1">Name</label>
          <InputText
            options={{
              id: 'name',
              type: 'text',
              ...register('name', { required: true }),
              placeholder: 'Enter your name',
            }}
          />
          {errors.name && <span className="text-red-500">This field is required</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-1">Email</label>
          <InputText
            options={{
              id: 'email',
              type: 'email',
              ...register('email', { required: true }),
              placeholder: 'Enter your email',
            }}
          />
          {errors.email && <span className="text-red-500">This field is required</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="cardElement" className="block font-medium mb-1">Credit Card</label>
          <CardElement className="p-2 border border-gray-300 rounded-md" />
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors duration-300"
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Pay'}
        </button>
      </form>
    </div>
  );
};

export default PaymentInfo;
