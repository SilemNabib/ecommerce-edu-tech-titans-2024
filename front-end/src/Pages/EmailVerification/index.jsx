import { ArrowBack } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputText from '../../Components/InputText';
import ProgressBar from '../../Components/ProgressBar';
import { useAuth } from '../../Context/AuthContext';

export const registerSteps = ["Email", "Verify", "Create"];

/**
 * Component for sending a verification email.
 *
 * @returns {JSX.Element} The SendVerificationEmail component.
 */
const SendVerificationEmail = () => {
  // Initialize page methods
  localStorage.removeItem("registerToken");
  localStorage.removeItem("email-validated");

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const auth = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setError(null);
      setLoading(true);
      auth.requestRegister({
        data: data,
        then: (response) => {
          if(response.data.token && localStorage.getItem("registerToken") === response.data.token){
            navigate('/register/verification-code');
          }
        },
        on_error: (error) => setError(error.response.data.details),
        final: () => setLoading(false),
      });

    } catch (error) {
      toast.error('An error occurred while sending the verification email');
    }
  };

  return (
    <div className='w-full h-full min-h-screen relative'
        style={{
          backgroundImage: 'url("../assets/store_background.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'}}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative max-w-4xl mx-auto mt-8 mb-8 p-8 bg-gray-100 rounded-lg shadow-md">
        <button>
          <a href="/bootcamp-tech-titans-2024_ecommerce/login">
            <ArrowBack />
          </a>
        </button>
        <ProgressBar steps={registerSteps} currentStep={0} title="Email to register" />
        <div className="flex flex-col items-center justify-center mt-8 mx-4">
          <div className="w-4/6 p-5 mx-4 min-w-72">
            <h1 className="text-center mb-6 font-bold text-xl">We will send a verification email 👋</h1>
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
              <label className="font-bold mb-1">Email *</label>
              <InputText options={{type: 'email', ...register('email', { required: true }), placeholder: 'Enter your email' }}/>
              {errors.email && <span className="text-red-500 mb-4">This field is mandatory</span>}

              <button
                type="submit"
                className="mb-2 mt-1 bg-black text-white py-2 px-4 rounded-lg hover:font-bold"
              >
                Send email
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

export default SendVerificationEmail;
