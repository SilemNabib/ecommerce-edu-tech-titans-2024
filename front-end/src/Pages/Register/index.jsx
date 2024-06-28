import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TogglePassword from '../../Components/TogglePassword';
import { registerSteps } from '../EmailVerification';
import ProgressBar from '../../Components/ProgressBar';
import InputText from '../../Components/InputText';
import { CircularProgress } from '@mui/material';
import { isRegisterExpired, isTokenExpired, useAuth } from '../../Context/AuthContext';
/**
 * Register component for user registration.
 *
 * @returns {JSX.Element} The Register component.
 */
const Register = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const token = localStorage.getItem("registerToken");

  if (!token || isRegisterExpired(token) || !localStorage.getItem("email-validated")) {
    localStorage.removeItem("registerToken");
    localStorage.removeItem("email-validated");
    window.location.href = "/bootcamp-tech-titans-2024_ecommerce/register/verification-code"
  }else{
    localStorage.setItem("registerToken", token);
  }

  const { register, handleSubmit, formState: { errors } } = useForm();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
        try {
      setError(null);
      setLoading(true);
      auth.requestComplete({
        data: data,
        then: (response) => {
          if(response.data.token && localStorage.getItem("authToken") === response.data.token){
            navigate('/');
          }else{
            setError('Invalid verification');
          }
        },
        on_error: (error) => {
          setError(error.response.data.details);
        },
        final: () => setLoading(false),
      });

    } catch (error) {
      toast.error('An error occurred while sending the verification email');
    }
    
  };

  return (
    <div className='w-full h-full  min-h-screen relative'
        style={{
          backgroundImage: 'url("../assets/store_background.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'}}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative max-w-4xl mx-auto mt-8 mb-8 p-8 bg-gray-100 rounded-lg shadow-md">
        <ProgressBar steps={registerSteps} currentStep={2} title="A little bit about you" />
        <div className="flex flex-col items-center justify-center mt-8 mx-4">
          <div className="w-4/6 p-5 mx-4 min-w-72">
            <h1 className="text-center mb-6 font-bold text-xl">Great to have you here 👏</h1>
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>

              <div className="flex flex-auto justify-between grid-cols-2">
                <div className="w-full mr-3">
                  <label className="font-bold mb-1">Name *</label>
                  <InputText options={{type: 'text', ...register('firstName', { required: true }), placeholder: 'Your name(s)',}}/>
                  {errors.firstName && <span className="text-red-500 mb-4">This field is mandatory</span>}
                </div>

                <div  className="w-full ml-3">
                  <label className="font-bold mb-1">Surname(s) *</label>
                  <InputText options={{type: 'text', ...register('lastName', { required: true }), placeholder: 'Your surname(s)',}}/>
                  {errors.lastName && <span className="text-red-500 mb-4">This field is mandatory</span>}
                </div>
              </div>

              <label className="font-bold mb-1 mt-1">Password *</label>
              <TogglePassword register={register} name="password" />
              {errors.password && <span className="text-red-500 mb-4">This field is mandatory</span>}

              
              <label className="font-bold mb-1 mt-1">Phone number *</label>
              <InputText options={{type: 'text', ...register('phone', { required: true, pattern: /^\d{10}$/ }), placeholder: 'Your surname(s)',}}/>
              {errors.phone && <span className="text-red-500">Please accept the Privacy Policy</span>}
              <input type="hidden" value={token} {...register('token')} />
              <div className="mt-2 mb-4 px-4">
                <label className='block mb font-light text-sm'>
                  <input type="checkbox" {...register('acceptTerms', { required: true })} /> I have read and accept the terms and conditions of use and purchase and I understand the information on the use of my personal data provided in the Privacy Policy
                </label>
                {errors.acceptTerms && <span className="text-red-500">Please accept the Privacy Policy</span>}
              </div>

              <button type="submit" className="bg-black text-white py-2 px-4 rounded-lg hover:font-bold">
                Create account
              </button>
              <span className="w-full text-center text-red-500">
                {loading && <CircularProgress/>}
                {error}</span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
