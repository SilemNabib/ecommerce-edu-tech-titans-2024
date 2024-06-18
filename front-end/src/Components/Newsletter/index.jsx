import React, { useState } from 'react';

/**
 * This component displays a newsletter subscription form.
 *
 * @returns {JSX.Element} The rendered Newsletter component.
 */
const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [message, setMessage] = useState('');

  // Logic to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, consent });
    setMessage('Successfully subscribed!');
  };

  return (
    <section className="bg-gray-100  text-black py-10 w-full flex items-center justify-center">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between bg-gray  border border-gray-700 p-8 rounded-lg lg:rounded-xl space-y-8 lg:space-y-0">
        <div className="lg:w-1/2 text-center lg:text-left">
          <h2 className="text-3xl font-bold">Stay Ahead with the Latest Trends and Exclusive Offers</h2>
          <p className="mt-4 text-gray-700">
            Subscribe now and receive the latest in fashion and advice directly to your email.
          </p>
        </div>
        <div className="lg:w-1/2">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-gray-600">Email</label>
              <input 
                type="email" 
                id="email" 
                className="mt-1 block w-full px-4 py-2 bg-gray border border-gray-700 rounded-md focus:ring focus:ring-opacity-50 focus:ring-gray-500 text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="inline-flex items-start">
                <input 
                  type="checkbox" 
                  className="form-checkbox h-5 w-5 text-gray-600 bg-black border border-gray-700 rounded"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                />
                <span className="ml-2 text-gray-700 text-sm">
                  I have read and understand the information about the use of my personal data explained in the Privacy Policy and I agree to receive personalized commercial communications from SUNFLOWERS via email and other means.
                </span>
              </label>
            </div>
            <button 
              type="submit" 
              className="w-full bg-black text-white py-3 px-4 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              disabled={!email || !consent}
            >
              SUBSCRIBE NOW
            </button>
          </form>
          {message && <p className="mt-4 text-green-800">{message}</p>}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
