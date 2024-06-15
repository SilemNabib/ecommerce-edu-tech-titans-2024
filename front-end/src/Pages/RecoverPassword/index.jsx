import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    //
    console.log('Email sent to:', email);
  };

  return (
    <div className="max-w-md mx-auto p-5 bg-white rounded-lg shadow-md">
      <h2 className="text-center mb-5 font-bold">HAVE YOU FORGOTTEN YOUR PASSWORD?</h2>
      <p className="text-center mb-5">Enter the email address associated with your account and we'll send you a link to update your password.</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block font-bold mb-2">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 px-4 rounded hover:font-bold"
        >
          Send Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;