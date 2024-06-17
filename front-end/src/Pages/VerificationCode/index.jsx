import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Component for entering and verifying a verification code.
 *
 * @returns {JSX.Element} The VerificationCode component.
 */
const VerificationCode = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = async (data) => {
    try {
      // Simulamos una petición al backend para verificar el código - Se debe cambiar por la petición real
      const response = await fetch('/api/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: data.code }),
      });

      const result = await response.json();

      if (response.ok && result.valid) {
        toast.success('Code verified successfully');

        if (location.pathname === '/register') {
          navigate('/login');
        } else if (location.pathname === '/recover-password') {
          navigate('/update-password');
        }
      } else {
        toast.error('Incorrect verification code');
      }
    } catch (error) {
      toast.error('An error occurred during verification');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-8 mx-4">
      <div className="w-full md:w-1/3 p-5 bg-gray-100 rounded-lg shadow-md mx-4">
        <h2 className="text-center mb-5 font-bold">ENTER VERIFICATION CODE</h2>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <label className="font-bold mb-1">Verification Code</label>
          <input
            type="text"
            {...register('code', { required: true })}
            className="mb-4 p-2 border border-black rounded-lg focus:outline-none"
          />
          {errors.code && <span className="text-red-500 mb-4">This field is mandatory</span>}

          <button
            type="submit"
            className="bg-black text-white py-2 px-4 rounded-lg hover:font-bold"
          >
            VERIFY CODE
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerificationCode;
