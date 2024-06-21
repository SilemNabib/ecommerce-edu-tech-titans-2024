import { useState } from 'react';

const Select = ({ options, placeholder, className }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <select
      value={selectedOption}
      onChange={handleChange}
      className={`block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 ${className}`}
    >
      <option value="">{placeholder}</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;
