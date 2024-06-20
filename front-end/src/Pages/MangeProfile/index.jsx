import React, { useState, useEffect } from 'react';
import { UserInfo } from '../../config/UserInfo';

const ManageProfile = () => {
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState(UserInfo.firstName);
  const [lastName, setLastName] = useState(UserInfo.lastName);
  const [email, setEmail] = useState(UserInfo.email);
  const [phone, setPhone] = useState(UserInfo.phone);
  const [addresses, setAddresses] = useState([...UserInfo.addresses]);
  const [password, setPassword] = useState(''); // Estado para la contraseña

  // Función para guardar los cambios (simulación de guardado)
  const saveChanges = () => {
    //enviar los datos editados al servidor, simulareción
    const updatedUserInfo = {
      firstName,
      lastName,
      email,
      phone,
      addresses,
      password // Agregar la contraseña al objeto updatedUserInfo
    };
    console.log("Guardando cambios:", updatedUserInfo);
    // Lógica para guardar los cambios en el servidor
    // ...
    // Desactivar el modo de edición
    setEditing(false);
    setPassword(''); // Limpiar el campo de contraseña después de guardar
  };

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
            <span className="text-white font-bold">Hi, {UserInfo.firstName}</span>
          </div>
        </div>

        <ul>
          <li className="mb-2">
            <a href="/information/profile" className="text-gray-700 hover:text-gray-900">
              Profile
            </a>
          </li>
          <li className="mb-2">
            <a href="/order-history" className="text-gray-700 hover:text-gray-900">
              Orders History
            </a>
          </li>
          <li className="mb-2">
            <a href="/manage-profile" className="text-gray-700 hover:text-gray-900 font-bold">
              Manage Profile
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-700 hover:text-gray-900 ">
              Log Out
            </a>
          </li>
        </ul>
      </nav>
     

      <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-4xl flex flex-col md:flex-row mt-8">
        <div className="flex-1 p-4 flex flex-col justify-between">
          <section>
            <h2 className="text-xl font-bold mb-4">PERSONAL INFORMATION</h2>
            <div className="mt-4">
              <div className="grid  gap-4">
                <div>
                  <label className="block font-bold" htmlFor="firstName">
                    Name
                  </label>
                  {/*editing ? (
                    <input
                      type="text"
                      id="firstName"
                      className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 block w-full sm:text-sm border rounded-md p-1"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  ) : (
                    <span>{firstName}</span>
                  )*/}
                  <span>{firstName}</span>           </div>
                <div>
                  <label className="block font-bold" htmlFor="lastName">
                    Surname
                  </label>
                  {/*editing ? (
                    <input
                      type="text"
                      id="lastName"
                      className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 block w-full sm:text-sm border rounded-md p-1"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  ) : (
                    <span>{lastName}</span>
                  )*/}
                  <span>{lastName}</span>
                </div>
                 <div>
                  <label className="block font-bold" htmlFor="email">
                    Email
                  </label>
                  {editing ? (
                    <input
                      type="email"
                      id="email"
                      className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 block w-full sm:text-sm border rounded-md p-1"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  ) : (
                    <span>{email}</span>
                  )}
                </div>
                <div>
                  <label className="block font-bold" htmlFor="phone">
                    Phone
                  </label>
                  {editing ? (
                    <input
                      type="tel"
                      id="phone"
                      className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 block w-full sm:text-sm border rounded-md p-1"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  ) : (
                    <span>{phone}</span>
                  )}
                </div>
              </div>
            </div>
          </section>
          <section>
            <label className="block font-bold mt-4">Addresses:</label>
            {editing ? (
              <ul>
                {addresses.map((address, index) => (
                  <li key={index}>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => {
                        const updatedAddresses = [...addresses];
                        updatedAddresses[index] = e.target.value;
                        setAddresses(updatedAddresses);
                      }}
                      className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 block w-full sm:text-sm border rounded-md p-1"
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <ul>
                {addresses.map((address, index) => (
                  <li key={index}>{address}</li>
                ))}
              </ul>
            )}
            <label className="block font-bold mt-4">Password:</label>
            {editing ? (
              <input
                type="password"
                id="password"
                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 block w-full sm:text-sm border rounded-md p-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            ) : (
              <span>********</span>
            )}
          </section>
          <div className="mt-4">
            {editing ? (
              <button
                onClick={saveChanges}
                className="bg-black hover:font-bold text-white  py-2 px-4 rounded">
                Save Changes
              </button>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="bg-black hover:font-bold text-white  py-2 px-4 rounded">
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProfile;
