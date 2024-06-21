import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * This component renders a form where users can enter their email address to receive a password reset link.
 *
 * @returns {JSX.Element} The ForgotPassword component.
 */
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Simulamos una petición al backend para enviar el link
      const response = await fetch('/api/send-reset-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toast.success('Link sent successfully');
        navigate('/verification-code');
      } else {
        toast.error('Failed to send link');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-8 mx-4">
      <div className="w-full md:w-1/3 p-5 bg-gray-100 rounded-lg shadow-md mx-4">
        <h2 className="text-center mb-5 font-bold">HAVE YOU FORGOTTEN YOUR PASSWORD?</h2>
        <p className="text-center mb-5">
          Enter the email address associated with your account and we&apos;ll send you a link to update your password.
        </p>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="email" className="font-bold mb-1">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 p-2 border border-black rounded-lg focus:outline-none"
            required
          />
          <button
            type="submit"
            className="bg-black text-white py-2 px-4 rounded-lg hover:font-bold"
          >
            Send Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;