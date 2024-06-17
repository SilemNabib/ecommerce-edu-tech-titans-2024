import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TogglePassword from '../../Components/TogglePassword';

/**
 * Renders a form for updating the password.
 *
 * @returns {JSX.Element} The UpdatePassword component.
 */
const UpdatePasword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    if (data.password === data.confirmPassword) {
      toast.success('Password reset successfully');
    } else {
      toast.error('Passwords do not match');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-8 mx-4">
      <div className="w-full md:w-1/3 p-5 bg-gray-100 rounded-lg shadow-md mx-4">
        <h2 className="text-center mb-5 font-bold">CREATE NEW PASSWORD</h2>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <label className="font-bold mb-1">New Password</label>
          <div className="mb-4"> 
            <TogglePassword register={register} name="password" />
            {errors.password && <span className="text-red-500">This field is mandatory</span>}
          </div>
  
          <label className="font-bold mb-1">Confirm New Password</label>
          <div className="mb-4"> 
            <TogglePassword register={register} name="confirmPassword" />
            {errors.confirmPassword && <span className="text-red-500">This field is mandatory</span>}
          </div>
  
          <button
            type="submit"
            className="bg-black text-white py-2 px-4 rounded-lg hover:font-bold"
          >
            RESET PASSWORD
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePasword;
