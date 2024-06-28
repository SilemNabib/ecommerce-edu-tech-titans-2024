import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerSteps } from '../EmailVerification';
import ProgressBar from '../../Components/ProgressBar';
import { ArrowBack } from '@mui/icons-material';
import InputText from '../../Components/InputText';
import { CircularProgress } from '@mui/material';
import { isTokenExpired, useAuth } from '../../Context/AuthContext';

/**
 * Component for entering and verifying a verification code.
 *
 * @returns {JSX.Element} The VerificationCode component.
 */
const VerificationCode = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();

    // Extraer el token de la URL
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token')? searchParams.get('token') : localStorage.getItem("registerToken");

  if (!token || isTokenExpired(token)) {
    localStorage.removeItem("registerToken");
    localStorage.removeItem("email-validated");
    window.location.href='/bootcamp-tech-titans-2024_ecommerce/register/email-verification';
  }else{
    localStorage.setItem("registerToken", token);
  }

  if(localStorage.getItem("email-validated")){
    window.location.href='/bootcamp-tech-titans-2024_ecommerce/register/complete';
  }

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      setError(null);
      setLoading(true);
      auth.requestVerify({
        data: data,
        then: (response) => {
          if(response.data.token && localStorage.getItem("registerToken") === response.data.token){
            localStorage.setItem("email-validated", true);
            navigate('/register/complete');
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
        <button>
          <a href="/bootcamp-tech-titans-2024_ecommerce/register/email-verification">
            <ArrowBack />
          </a>
        </button>
        <ProgressBar steps={registerSteps} currentStep={1} title="Confirm it's your email" />
        <div className="flex flex-col items-center justify-center mt-8 mx-4">
          <div className="w-4/6 p-5 mx-4 min-w-72">
            <h1 className="text-center mb-6 font-bold text-xl">Enter the code we've sent 😎</h1>
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
              <label className="font-bold mb-1">Verification Code *</label>
              <InputText options={{type: 'text',...register('verificationCode', { required: true }), placeholder: 'Enter the code',}} />
              {errors.verificationCode && <span className="text-red-500 mb-4">This field is mandatory</span>}
              <input type="hidden" value={token} {...register('token')} />
            
              <button type="submit" className="mt-1 bg-black text-white py-2 px-4 rounded-lg hover:font-bold">
                Verify code
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

export default VerificationCode;
