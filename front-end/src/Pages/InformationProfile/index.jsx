import React, { useState, useEffect } from 'react';
import { UserInfo } from '../../config/UserInfo';

const Profile = () => {
  return (
     
    <div className="flex flex-col md:flex-row items-start p-8">

      <nav className="w-65 p-4 mb-auto md:mb-0 mt-8 md:mr-8 shadow-lg bg-gray-200">
        <div className="relative w-60 h-40 overflow-hidden mb-4 mx-auto">
          <img
            src="/assets/user_model.jpg"
            alt="Profile"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 py-2 text-center w-full">
            <span className="text-white font-bold">Hola, {UserInfo.firstName}</span>
          </div>
        </div>

        <ul>
          <li className="mb-2">
            <a href="/information/profile" className="text-gray-700 hover:text-gray-900 font-bold">
              Profile
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-gray-700 hover:text-gray-900">
              Orders History
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-gray-700 hover:text-gray-900">
              Manage Accout
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-700 hover:text-gray-900">
              Log Out
            </a>
          </li>
        </ul>
      </nav>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-4xl flex flex-col md:flex-row mt-8">
        <div className="flex-1 p-4 flex flex-col justify-between">
          <section>
            <h2 className="text-xl font-bold mb-4">PERSONAL INFORMATION</h2>
            <div>
              <h3 className="text-lg font-bold mb-2">IDENTIFICATION DATA</h3>
            </div>
            <div className="mt-4">
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold" htmlFor="firstName">
                    Name
                  </label>
                  <span>{UserInfo.firstName}</span>
                </div>
                <div>
                  <label className="block font-bold" htmlFor="lastName">
                    Surname
                  </label>
                  <span>{UserInfo.lastName}</span>
                </div>
                <div>
                  <label className="block font-bold" htmlFor="lastName">
                    Email
                  </label>
                  <span>{UserInfo.email}</span>
                </div>
                <div>
                  <label className="block font-bold" htmlFor="phone">
                    Phone
                  </label>
                  <span>{UserInfo.phone}</span>
                </div>
              </div>
            </div>
          </section>
          <section>
            <label className="block font-bold mt-4">Addresses:</label>
            <ul>
              {UserInfo.addresses.map((address, index) => (
                <li key={index}>{address}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;