import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProgressBar from '../../Components/ProgressBar';
import { ArrowBack } from '@mui/icons-material';
import InputText from '../../Components/InputText';

const registerSteps = [
  <a href={"/email-verification"}>Email verification</a>,
  <a href={"/verification-code"}>Verification code</a>,
  <a href={"/register"}>Create account</a>,
];

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

  return (
    <div className='w-screen h-screen'
        style={{
          backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/d/dc/Trendy_apparel_store_%28Unsplash%29.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'}}>
      <div className="max-w-4xl mx-auto mt-8 p-8 bg-gray-100 rounded-lg shadow-md">
        <button>
          <a href="/login">
            <ArrowBack />
          </a>
        </button>
        <ProgressBar steps={registerSteps} currentStep={0} title="Register progress" />
        <div className="flex flex-col items-center justify-center mt-8 mx-4">
          <div className="w-4/6 p-5 mx-4">
            <h1 className="text-center mb-6 font-bold text-xl">We will send a verification email</h1>
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
              <label className="font-bold mb-1">Email</label>
              <InputText
              type="email"
                
                options={{
                  type: 'email',
                  ...register('email', { 
                      required: true
                   }),
                  placeholder: 'Enter your email',
                }}
              />
              {errors.email && <span className="text-red-500 mb-4">This field is mandatory</span>}

              <button
                type="submit"
                className="mb-2 mt-1 bg-black text-white py-2 px-4 rounded-lg hover:font-bold"
              >
                Send email
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendVerificationEmail;
