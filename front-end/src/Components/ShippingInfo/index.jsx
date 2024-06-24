import { useEffect, useState } from 'react';
import InputText from '../InputText';
import { ApiConfig } from '../../config/ApiConfig';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ShippingInfo = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    city: "",
    fullName: "",
    personId: "",
    phone: "",
    countryCode: "",
    zipCode: "",
    street: "",
  });

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    // Fetch countries from API or database
    const fetchCountries = async () => {
      try {
        fetch(ApiConfig.countries)
        .then((res) => res.json())
        .then((data) => {
          setCountries(data);
        });
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

  const { countryCode, zipCode, street,  city, fullName, personId, phone } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await auth.authFetch(ApiConfig.addresses, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(formData),
    });
    
    if (response.status === 200) {
      localStorage.setItem("selectedAddress", response.data.id);
      navigate("/checkout/payment");
    }
  }

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <form onSubmit={handleSubmit}>
        <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="fullName" className="block font-medium mb-1">
              Fullname
            </label>
            <InputText
              options={{
                id: "fullName",
                type: "text",
                value: fullName,
                onChange: handleInputChange,
                required: true,
              }}
            />
          </div>
          <div>
            <label htmlFor="personId" className="block font-medium mb-1">
              ID Number
            </label>
            <InputText
              options={{
                id: "personId",
                type: "text",
                value: personId,
                onChange: handleInputChange,
                required: true,
              }}
            />
          </div>
          <div>
            <label htmlFor="phone" className="block font-medium mb-1">
              Phone Number
            </label>
            <InputText
              options={{
                id: "phone",
                type: "tel",
                value: phone,
                onChange: handleInputChange,
                required: true,
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="countryCode" className="block font-medium mb-1">
              Country
            </label>
            <select
              id="countryCode"
              value={countryCode}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value={null}>Select a country</option>
              {countries?.map((country) => (
                <option key={country.prefix} value={country.prefix}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="city" className="block font-medium mb-1">
              City
            </label>
            <InputText
              options={{
                id: "city",
                type: "text",
                value: city,
                onChange: handleInputChange,
                required: true,
              }}
            />
          </div>
          <div>
            <label htmlFor="zipCode" className="block font-medium mb-1">
              Postal Code
            </label>
            <InputText
              options={{
                id: "zipCode",
                type: "text",
                value: zipCode,
                onChange: handleInputChange,
                required: true,
              }}
            />
          </div>
          <div>
            <label htmlFor="street" className="block font-medium mb-1">
              Street Address
            </label>
            <InputText
              options={{
                id: "street",
                type: "text",
                value: street,
                onChange: handleInputChange,
                required: true,
              }}
            />
          </div>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors duration-300"
          >
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingInfo;