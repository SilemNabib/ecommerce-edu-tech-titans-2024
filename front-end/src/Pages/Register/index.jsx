import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TogglePassword from '../../Components/TogglePassword';

/**
 * Register component for user registration.
 *
 * @returns {JSX.Element} The Register component.
 */
const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const navigate = useNavigate(); 

  const onSubmit = (data) => {
    console.log(data);
    toast.success('Successful register');
    navigate('/verification-code');
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center mt-8 pl-8 pr-8">
      <div className="w-full md:w-1/2 p-5 bg-gray-100 rounded-lg shadow-md mx-4">
        <h2 className="text-center mb-5 font-bold">DON&apos;T HAVE AN ACCOUNT YET? REGISTER NOW</h2>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <label className="font-bold mb-1">Name</label>
          <input
            type="text"
            {...register('name', { required: true })}
            className="mb-4 p-2 border border-black rounded-lg focus:outline-none"
          />
          {errors.name && <span className="text-red-500 mb-4">This field is mandatory</span>}

          <label className="font-bold mb-1">Surname(s)</label>
          <input
            type="text"
            {...register('surname', { required: true })}
            className="mb-4 p-2 border border-black rounded-lg focus:outline-none"
          />
          {errors.surname && <span className="text-red-500 mb-4">This field is mandatory</span>}

          <label className="font-bold mb-1">Email</label>
          <input
            type="email"
            {...register('email', { required: true })}
            className="mb-4 p-2 border border-black rounded-lg focus:outline-none"
          />
          {errors.email && <span className="text-red-500 mb-4">This field is mandatory</span>}

          <label className="font-bold mb-1">Password</label>
          <TogglePassword register={register} name="password" />
          {errors.password && <span className="text-red-500 mb-4">This field is mandatory</span>}

          <label className="font-bold mb-1">Phone number*</label>
          <input
            type="text"
            {...register('prefix')}
            className="mb-4 p-2 border border-black rounded-lg focus:outline-none"
          />

          <div className="mb-4">
            <label className='block mb'>
              <input type="checkbox" {...register('acceptTerms', { required: true })} /> I have read and accept the terms and conditions of use and purchase and I understand the information on the use of my personal data provided in the Privacy Policy
            </label>
            {errors.acceptTerms && <span className="text-red-500">Please accept the Privacy Policy</span>}
          </div>
          
          <div className="mb-4">
            <label>
              <input type="checkbox" {...register('remindMe')} /> Remind me
            </label>
          </div>

          <button
            type="submit"
            className="bg-black text-white py-2 px-4 rounded-lg hover:font-bold"
          >
            CREATE ACCOUNT
          </button>
        </form>
      </div>
      <div className="w-full md:w-1/2 p-5 mx-4">
        {/* Cambiar por otra imagen, que venga desde la db */}
        <img src="https://www.koaj.co/themes/koaj/img/register-May-2024.jpeg" alt="Register Illustration" className="w-full rounded-lg shadow-md" />
      </div>
    </div>
  );
};

export default Register;
