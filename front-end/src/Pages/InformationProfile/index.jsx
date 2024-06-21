import React, { useState, useEffect } from 'react';
import { UserInfo } from '../../config/UserInfo';
import ProfileNavigation from '../../Components/ProfileNavigation';

const Profile = () => {

  return (
     
    <div className="flex flex-col md:flex-row items-start p-8">
      <ProfileNavigation userInfo={UserInfo} />      
      
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

                <div>
                  <label className="block font-bold" htmlFor="registrationDate">
                    Registration Date
                  </label>
                  <span>{UserInfo.registrationDate}</span>
                </div>
                
              </div>
              
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Profile;