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
    <div className="max-w-md mx-auto p-5 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-center mb-5 font-bold">LOG IN OR CREATE YOUR ACCOUNT</h2>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <label className="font-bold mb-1">Email</label>
        <input
          type="email"
          {...register('email', { required: true })}
          placeholder="Ingresa tu correo electrónico"
          className="mb-auto p-2 border border-black rounded-lg focus:outline-none"
        />
        {errors.email && <span className="text-red-500 mb-4">This field is mandatory</span>}
        
        <label className="font-bold mb-1">Password</label>
        <input
          type="password"
          {...register('password', { required: true })}
          placeholder="Contraseña"
          className="mb-auto p-2 border border-black rounded-lg focus:outline-none"
        />
        {errors.email && <span className="text-red-500 mb-4">This field is mandatory</span>}

        <div className="mb-4 flex items-center justify-end">
            <label className="mr-auto">
                <input type="checkbox" {...register('rememberMe')} /> Remind me
            </label>
            <a href="#" className="text-gray-400 underline">
                Have you forgotten your password?
            </a>
        </div>


        <button
          type="submit"
          className="bg-black text-white py-2 px-4 rounded hover:bg-gray-700"
        >
          SIGN IN
        </button>
      </form>
    </div>
  );
};

export default Login;