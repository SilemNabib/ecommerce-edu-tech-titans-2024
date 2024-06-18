import { useEffect, useState } from 'react';
import shippingInfoData from '../../config/ShippingInfoData';
import InputText from '../InputText';

const ShippingInfo = () => {
  const [formData, setFormData] = useState({
    country: '',
    postalCode: '',
    address: '',
    streetAddress: '',
  });

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    // Fetch countries from API or database
    const fetchCountries = async () => {
      try {
        // Replace this with the actual API call
        const data = shippingInfoData.countries;
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const { country, postalCode, address, streetAddress } = formData;

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="country" className="block font-medium mb-1">
            Country
          </label>
          <select
            id="country"
            value={country}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">Select a country</option>
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="postalCode" className="block font-medium mb-1">
            Postal Code
          </label>
          <InputText
            options={{
              id: 'postalCode',
              type: 'text',
              value: postalCode,
              onChange: handleInputChange,
              required: true,
            }}
          />
        </div>
        <div>
          <label htmlFor="address" className="block font-medium mb-1">
            Address
          </label>
          <InputText
            options={{
              id: 'address',
              type: 'text',
              value: address,
              onChange: handleInputChange,
              required: true,
            }}
          />
        </div>
        <div>
          <label htmlFor="streetAddress" className="block font-medium mb-1">
            Street Address
          </label>
          <InputText
            options={{
              id: 'streetAddress',
              type: 'text',
              value: streetAddress,
              onChange: handleInputChange,
              required: true,
            }}
          />
        </div>
      </div>
      <div className="mt-4">
        <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors duration-300">
          SUBMIT
        </button>
      </div>
    </div>
  );
};

export default ShippingInfo;