import React from "react";
import { NavLink } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center lg:flex-row py-10 px-4 sm:px-6 lg:px-8 gap-8 lg:gap-16 min-h-screen">
            <div className="w-full lg:w-1/2">
                <img className="hidden lg:block" src="/bootcamp-tech-titans-2024_ecommerce/assets/404.png" alt="Not Found" />
                <img className="hidden md:block lg:hidden" src="../../assets/404.png" alt="Not Found" />
                <img className="md:hidden" src="/bootcamp-tech-titans-2024_ecommerce/assets/404.png" alt="Not Found" />
            </div>
            <div className="w-full lg:w-1/2 text-center lg:text-left">
                <h1 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">Oops! Page not found.</h1>
                <p className="mt-4 text-lg text-gray-700">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
                <p className="mt-2 text-lg text-gray-700">Please check the URL or return to the homepage.</p>
                <button 
                  className="mt-8 w-full lg:w-auto px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-700">
                  <NavLink to='/'>Return to Homepage</NavLink>
                </button>
            </div>
        </div>
    );
};

export default NotFound;