import {
  ComputerDesktopIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import TogglePassword from "../../Components/TogglePassword";
import { GlobalContext } from "../../Context";
import { useAuth } from "../../Context/AuthContext";

/**
 * Represents the Login page component.
 *
 * @returns {JSX.Element} The Login page component.
 */
const Login = () => {
  const context = useContext(GlobalContext);
  const auth = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const onSubmit = (data) => {
    context.setLoading(true);
    auth
      .requestLogin({
        data: data,
        then: (response) => {
          if (response) {
            navigate("/");
          } else {
            // Manejar el mensaje de error, no supe hacerlo
            // No pudo iniciar sesión por credenciales incorrectas
          }
        },
        on_error: (error) => {
          // Manejar el mensaje de error, no supe hacerlo
        },
        final: () => context.setLoading(false)
      })
  };

  
  const handleBack = () => {
    navigate('/');
  };

  return (
  <div>
<div className="max-w-4xl mx-auto mt-8 p-8 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-center mb-8 font-bold">
        LOG IN OR CREATE YOUR ACCOUNT
      </h2>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 mb-9 md:mb-0 p-6">
          <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <label className="font-bold mb-1">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Enter your email address"
              className="p-2 border border-black rounded-lg focus:outline-none mb-*"
            />
            {errors.email && (
              <span className="text-red-500 mb-4">This field is mandatory</span>
            )}

            <label className="font-bold mb-1">Password</label>
            <TogglePassword register={register} name="password" />
            {errors.password && (
              <span className="text-red-500 mb-4">This field is mandatory</span>
            )}

            <div className="mt-4 mb-4 flex items-center justify-between">
              <label>
                <input
                  type="checkbox"
                  {...register("rememberMe")}
                />{" "}
                Remind me
              </label>
              <a href="/recover-password" className="text-gray-400 underline">
                Have you forgotten your password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full md:w-auto bg-black text-white py-2 px-4 rounded-lg hover:font-bold"
            >
              SIGN IN
            </button>
          </form>
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6">
          <p className="mb-4 font-bold">DON&apos;T HAVE AN ACCOUNT YET?</p>
          <ul className="mb-4 list-disc pl-10 leading-relaxed">
            {" "}
            <li className="mb-2 flex items-center">
              <LocalShippingIcon className="w-5 h-5 mr-2 text-gray-500" />
              Enjoy fast and efficient delivery to your door
            </li>
            <li className="mb-2 flex items-center">
              <ComputerDesktopIcon className="w-8 h-8 mr-2 text-gray-500" />
              Shop from the comfort of your home and have your products
              delivered to you
            </li>
            <li className="mb-2 flex items-center">
              <ShoppingBagIcon className="w-6 h-6 mr-2 text-gray-500" />
              View your order cart
            </li>
          </ul>

          <button
            onClick={() => navigate("/email-verification")}
            className="mb-6 bg-gray-300 text-black py-2 px-4 rounded-lg hover:font-bold"
          >
            CREATE ACCOUNT
          </button>
        </div>
        
      </div>
      
    </div>
    <div className="flex justify-end mt-4 md:w-1/2 mx-5">
        <button
          onClick={handleBack}
          className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:font-bold"
        >
          BACK
        </button>   
      </div>
  </div>
    
  );
};

export default Login;
