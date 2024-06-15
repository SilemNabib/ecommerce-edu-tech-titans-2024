import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ComputerDesktopIcon, ShoppingBagIcon } from "@heroicons/react/24/solid";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import TogglePassword from '../../Components/TogglePassword';
import { useNavigate } from 'react-router-dom';



const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

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
            <TogglePassword register={register} name="password" />
            {errors.password && <span className="text-red-500 mb-4">This field is mandatory</span>}

            <div className="mb-4 flex items-center justify-between">
              <label>
                <input type="checkbox" {...register('rememberMe')} /> Remind me
              </label>
              <a href="/recover-password" className="text-gray-400 underline">
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
          <p className="mb-4 font-bold">DON'T HAVE AN ACCOUNT YET?</p>
          <ul className="mb-4 list-disc pl-10">
            <li className="mb-2 flex items-center">
              <LocalShippingIcon className="w-5 h-5 mr-2 text-gray-500" />
              Enjoy fast and efficient delivery to your door
            </li>
            <li className="mb-2 flex items-center">
              <ComputerDesktopIcon className="w-8 h-8 mr-2 text-gray-500" />
              Shop from the comfort of your home and have your products delivered to you
            </li>
            <li className="mb-2 flex items-center">
              <ShoppingBagIcon className="w-6 h-6 mr-2 text-gray-500" />
              View your order cart
            </li>
          </ul>
          
          <button onClick={() => navigate('/register')} className="mb-6 bg-gray-300 text-black py-2 px-4 rounded hover:font-bold">CREATE ACCOUNT</button>

          
        </div>

          

      </div>
    </div>
  );
};

export default Login;
