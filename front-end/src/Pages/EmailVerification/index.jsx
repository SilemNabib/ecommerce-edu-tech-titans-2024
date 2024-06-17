import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SendVerificationEmail = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // Simulamos una petición al backend para enviar el correo de verificación - Se debe cambiar por la petición real
      const response = await fetch('/api/send-verification-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: data.email }),
      });

      if (response.ok) {
        toast.success('Verification email sent successfully');
        navigate('/verification-code');
      } else {
        toast.error('Failed to send verification email');
      }
    } catch (error) {
      toast.error('An error occurred while sending the verification email');
    }
  };

  const handleBack = () => {
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center mt-8 mx-4">
      <div className="w-full md:w-1/3 p-5 bg-gray-100 rounded-lg shadow-md mx-4">
        <h2 className="text-center mb-5 font-bold">WE WILL SEND A VERIFICATION EMAIL</h2>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <label className="font-bold mb-1">Email</label>
          <input
            type="email"
            {...register('email', { required: true })}
            className="mb-1 p-2 border border-black rounded-lg focus:outline-none"
          />
          {errors.email && <span className="text-red-500 mb-4">This field is mandatory</span>}

          <button
            type="submit"
            className="mb-2 bg-black text-white py-2 px-4 rounded-lg hover:font-bold"
          >
            SEND EMAIL
          </button>
        </form>
      </div>
      <div className="flex justify-end mt-4 w-full md:w-1/3 mx-4">
        <button
          onClick={handleBack}
          className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:font-bold"
        >
          BACK
        </button>   
      </div>
    </div>
  );
};

export default SendVerificationEmail;
