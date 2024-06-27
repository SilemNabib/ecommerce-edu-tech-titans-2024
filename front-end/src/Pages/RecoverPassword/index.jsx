import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ApiConfig } from '../../config/ApiConfig';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

/**
 * This component renders a form where users can enter their email address to receive a password reset link.
 *
 * @returns {JSX.Element} The ForgotPassword component.
 */
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [step, setStep] = useState("email");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    
    try {
      const response = await fetch(ApiConfig.recover_password, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStep("change")
        toast.success('Code sent successfully');
      } else {
        toast.error('Failed to send link');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
    setLoading(false);
  };

  const handleSubmitComplete = async (e) => {
    e.preventDefault();
    setLoading(true);

    const code = e.target.code.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(ApiConfig.reset_password, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          otp: code,
          password: password
        }),
      });
        if (response.ok && response.status === 200) {
          toast.success('Contraseña restablecida con éxito');
          navigate('/login');
        } else {
          const errorResponse = await response.json();
          toast.error(errorResponse.message || 'Error al restablecer la contraseña');
        }
      } catch (error) {
        toast.error('Ocurrió un error');
      }

    setLoading(false);
  }

  return (
    <div className="flex flex-col items-center justify-center mt-8 mx-4">
      <ToastContainer />
      <div className="w-full md:w-1/3 p-5 bg-gray-100 rounded-lg shadow-md mx-4">
        <h2 className="text-center mb-5 font-bold">
          HAVE YOU FORGOTTEN YOUR PASSWORD?
        </h2>
        <p className="text-center mb-5">
          Enter the email address associated with your account and we&apos;ll
          send you a code to update your password.
        </p>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="email" className="font-bold mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 p-2 border border-black rounded-lg focus:outline-none"
            required
            disabled={step !== "email"}
          />
          {loading ? (
            <CircularProgress />
          ) : step === "email" ? (
            <button
              type="submit"
              className="bg-black text-white py-2 px-4 rounded-lg hover:font-bold"
              disabled={step !== "email"}
            >
              Send code
            </button>
          ) : null}
        </form>

        <form className="flex flex-col" onSubmit={handleSubmitComplete}>
          {step === "change" ? (
            <div>
              <div className='flex flex-row w-full justify-between items-center mt-4'>
                <label htmlFor="code" className="font-bold mb-1 w-1/4">
                  Code
                </label>
                <input
                  type="text"
                  id="code"
                  className="mb-2 p-2 border border-black rounded-lg focus:outline-none w-3/4"
                  required
                />
              </div>
              <div className='flex flex-row w-full justify-between items-center'>
                <label htmlFor="password" className="font-bold mb-1 w-1/4">
                  New Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="mb-2 p-2 border border-black rounded-lg focus:outline-none w-3/4"
                  required
                />
              </div>
              <div className='flex flex-row w-full justify-between items-center'>
                <label htmlFor="confirmPassword" className="font-bold mb-1 w-1/4">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="mb-4 p-2 border border-black rounded-lg focus:outline-none w-3/4"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-black text-white py-2 px-4 rounded-lg hover:font-bold w-full"
              >
                Reset Password
              </button>
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;