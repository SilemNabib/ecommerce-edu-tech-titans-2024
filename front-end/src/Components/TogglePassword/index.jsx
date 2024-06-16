import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';

const TogglePassword = ({ register, name }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <div className="flex items-center border border-black rounded-md">
        <input
          type={showPassword ? "text" : "password"}
          {...register(name, {
            required: true,
            pattern:
              /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!(){}\[\]:;,.?/|<>\-*])(?=\S+$).{8,}$/,
          })}
          placeholder="8 characters minimum, 1 lower case, 1 upper case, 1 number"
          className="w-full p-2 focus:outline-none rounded-l-md"
        />
        <button
          type="button"
          className="p-2 bg-white rounded-r-md hover:bg-gray-200"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? (
            <EyeSlashIcon className="h-5 w-5 text-gray-500" />
          ) : (
            <EyeIcon className="h-5 w-5 text-gray-500" />
          )}
        </button>
      </div>
    </div>
  );
};

export default TogglePassword;