import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { ApiConfig } from '../../config/ApiConfig';


const AdresseeInfo = () => {

  const auth = useAuth();
  const [addresses, setAddresses] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  
  const setData = (response) => {
    if (response.status === 200) {
      const items = response.data;
      // poner primero la dirección selecicionada si es que hay
      items.sort((a, b) => {
        if (a.id === localStorage.getItem('selectedAddress')) {
          return -1;
        }
        if (b.id === localStorage.getItem('selectedAddress')) {
          return 1;
        }
        return 0;
      });
      setAddresses(items);
      localStorage.setItem('selectedAddress', localStorage.getItem('selectedAddress') || items[0].id || null);
      setSelectedAddress(localStorage.getItem('selectedAddress'));
    }
  }

  const getAddresses = async () => {
    const response = await auth.authFetch(ApiConfig.addresses)
    setData(response);
  }

  useEffect(() => {
    getAddresses();
  }, []);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    isAgeConfirmed: false,
    isTermsAccepted: false,
  });

  const handleChange = (id) => {
    setSelectedAddress(id);
    localStorage.setItem('selectedAddress', id);
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4">Saved addresses</h2>
      <div className="max-h-80 overflow-y-scroll">
        {addresses && addresses?.map((address) => (
          <div key={address.id} className="border w-full border-gray-300 bg-gray-100 p-4 rounded-md flex flex-row mb-2">
            <input
              type="radio"
              name="address"
              id={address.id}
              value={address.id}
              className="form-radio h-5 w-5 text-black"
              defaultChecked={localStorage.getItem('selectedAddress') === address.id}
              onChange={() => handleChange(address.id)}
            />
            <div className="ml-6">
              <h3 className="font-semibold">{address.fullName}</h3>
              { selectedAddress === address.id &&
                (
                  <div>
                    <p>{address.street}</p>
                    <p>{`${address.city}, ${address.country.name}`}</p>
                    <p>{address.zipCode}</p>
                  </div>
                )
              }
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 border-t border-gray-300 pt-4">
        <button onClick={() => navigate("/checkout/new-address")} className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors duration-300">
          Add new address
        </button>
      </div>
    </div>
  );
};

export default AdresseeInfo;