import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    toast.success('Successful Login');
  };


  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-center mb-8 font-bold">LOG IN OR CREATE YOUR ACCOUNT</h2>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 mb-9 md:mb-0 p-6">
          <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>

            <label className="font-bold mb-1">Email</label>
            <input
              type="email"
              {...register('email', { required: true })}
              placeholder="Enter your email address"
              className="p-2 border border-black rounded-lg focus:outline-none"
            />
            {errors.email && <span className="text-red-500 mb-4">This field is mandatory</span>}

            <label className="font-bold mb-1">Password</label>
            <input
              type="password"
              {...register('password', { required: true })}
              placeholder="Password"
              className="p-2 border border-black rounded-lg focus:outline-none"
            />
            {errors.password && <span className="text-red-500 mb-4">This field is mandatory</span>}

            <div className="mb-4 flex items-center justify-between">
              <label>
                <input type="checkbox" {...register('rememberMe')} /> Remind me
              </label>
              <a href="#" className="text-gray-400 underline">
                Have you forgotten your password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full md:w-auto bg-black text-white py-2 px-4 rounded hover:font-bold"

            >
              SIGN IN
            </button>
          </form>
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6">
          <p className="mb-6 font-bold">DON'T HAVE AN ACCOUNT YET?</p>
          <ul className="mb-6 list-disc pl-10">
            <li>Track your orders</li>
            <li>Save your shipping and payment details and save time next time you shop with us</li>
            <li>You will be able to make returns online</li>
          </ul>
          
          <button className="mb-6 bg-gray-300 text-black py-2 px-4 rounded hover:font-bold">
            
            CREATE ACCOUNT
          </button>



        </div>
      </div>
    </div>
  );
};

export default Login;
