import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputText from '../InputText';

const AdresseeInfo = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    lastName: '',
    idNumber: '',
    phone: '',
    isAgeConfirmed: false,
    isTermsAccepted: false,
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.checked,
    });
  };

  const { email, name, lastName, idNumber, phone, isAgeConfirmed, isTermsAccepted } = formData;

  const goToShipping = () => {
    if (isAgeConfirmed && isTermsAccepted) {
      navigate('/checkout/shipping');
    }
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4">Personal Information - Addressee</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block font-medium mb-1">
            Email
          </label>
          <InputText
            options={{
              id: 'email',
              type: 'email',
              value: email,
              onChange: handleInputChange,
              required: true,
            }}
          />
        </div>
        <div>
          <label htmlFor="name" className="block font-medium mb-1">
            Name
          </label>
          <InputText
            options={{
              id: 'name',
              type: 'text',
              value: name,
              onChange: handleInputChange,
              required: true,
            }}
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block font-medium mb-1">
            Last Name
          </label>
          <InputText
            options={{
              id: 'lastName',
              type: 'text',
              value: lastName,
              onChange: handleInputChange,
              required: true,
            }}
          />
        </div>
        <div>
          <label htmlFor="idNumber" className="block font-medium mb-1">
            ID Number
          </label>
          <InputText
            options={{
              id: 'idNumber',
              type: 'text',
              value: idNumber,
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
              id: 'phone',
              type: 'tel',
              value: phone,
              onChange: handleInputChange,
              required: true,
            }}
          />
        </div>
      </div>
      <div className="mt-4">
        <div className="mb-4">
          <div className="flex items-center">
            <input
              id="isAgeConfirmed"
              type="checkbox"
              checked={isAgeConfirmed}
              onChange={handleCheckboxChange}
              required
              className="form-checkbox h-5 w-5 text-black"
            />
            <label htmlFor="isAgeConfirmed" className="ml-2 block text-sm leading-5 text-gray-900">
              I declare that I am of legal age to purchase from Sunflowers.
            </label>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex items-center">
            <input
              id="isTermsAccepted"
              type="checkbox"
              checked={isTermsAccepted}
              onChange={handleCheckboxChange}
              required
              className="form-checkbox h-5 w-5 text-black"
            />
            <label htmlFor="isTermsAccepted" className="ml-2 block text-sm leading-5 text-gray-900">
              I accept the data processing and privacy policy of Sunflowers Inc. <a href="#" className="text-gray-600 hover:text-gray-900">View more</a>.
            </label>
          </div>
        </div>
        <button
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors duration-300"
          disabled={!isAgeConfirmed || !isTermsAccepted}
          onClick={goToShipping}
          >
          GO TO PAYMENT
        </button>
      </div>
    </div>
  );
};

export default AdresseeInfo;